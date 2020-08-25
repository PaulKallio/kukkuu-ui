import React, { FunctionComponent, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/browser';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { IconPlusCircle } from 'hds-react';

import styles from './profileChildrenList.module.scss';
import ProfileChild from './child/ProfileChild';
import { profileChildrenSelector } from '../state/ProfileSelectors';
import AddNewChildFormModal from '../../registration/modal/AddNewChildFormModal';
import { addChildMutation } from '../../child/mutation/ChildMutation';
import { getSupportedChildData } from '../../child/ChildUtils';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import profileQuery from '../queries/ProfileQuery';
import { getProjectsFromProfileQuery } from '../ProfileUtil';
import { UpdateChildMutationInput } from '../../api/generatedTypes/globalTypes';
import Button from '../../../common/components/button/Button';

const ProfileChildrenList: FunctionComponent = () => {
  const { t } = useTranslation();
  const children = useSelector(profileChildrenSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [addChild, { loading: mutationLoading }] = useMutation(
    addChildMutation,
    {
      refetchQueries: [{ query: profileQuery }],
    }
  );
  const { trackEvent } = useMatomo();

  if (mutationLoading) return <LoadingSpinner isLoading={true} />;

  return (
    <>
      <div className={styles.heading}>
        <h2>{t('profile.heading')}</h2>
        {isOpen && (
          <AddNewChildFormModal
            setIsOpen={setIsOpen}
            addChild={(payload) => {
              const supportedChildData: Omit<
                UpdateChildMutationInput,
                'id'
              > = getSupportedChildData(payload);
              addChild({ variables: { input: supportedChildData } })
                .then(() => {
                  trackEvent({ category: 'action', action: 'Add child' });
                })
                .catch((error) => {
                  toast.error(t('profile.addChildMutation.errorMessage'));
                  Sentry.captureException(error);
                });
            }}
          />
        )}
      </div>

      <div className={styles.childrenList}>
        {children.edges ? (
          <>
            {getProjectsFromProfileQuery(children).map((project) => (
              <Fragment key={project.id}>
                <div className={styles.thisYearPartner}>
                  <h3>
                    {project.year} {project.name}
                  </h3>
                </div>
                {children.edges.map((childEdge) =>
                  childEdge?.node?.id &&
                  childEdge.node.project.year === project.year ? (
                    <ProfileChild
                      key={childEdge.node.id}
                      child={childEdge.node}
                    />
                  ) : null
                )}
              </Fragment>
            ))}
          </>
        ) : (
          <div className={styles.noChild}>
            <p>{t('profile.children.noChild.text')}</p>
          </div>
        )}
      </div>
      <Button
        variant="secondary"
        aria-label={t('child.form.modal.add.label')}
        className={styles.addChild}
        iconLeft={<IconPlusCircle />}
        onClick={() => setIsOpen(true)}
      >
        {t('child.form.modal.add.label')}
      </Button>
    </>
  );
};

export default ProfileChildrenList;
