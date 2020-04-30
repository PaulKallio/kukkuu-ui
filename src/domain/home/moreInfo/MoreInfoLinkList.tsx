import React from 'react';

import styles from './moreInfoLinkList.module.scss';
import { MoreInfoLink } from './types/moreInfo';

type MoreInfoLinkListProps = {
  links: MoreInfoLink[];
};

const MoreInfoLinkList = ({ links }: MoreInfoLinkListProps) => {
  return (
    <div className={styles.link}>
      {links.map((link, index: number) => {
        return (
          <a href={link.url} lang={link.langCode} key={index}>
            {link.langName}
          </a>
        );
      })}
    </div>
  );
};

export default MoreInfoLinkList;
