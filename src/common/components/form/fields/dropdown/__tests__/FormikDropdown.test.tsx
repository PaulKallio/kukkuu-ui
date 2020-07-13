import React from 'react';
import { shallow } from 'enzyme';
import { Field } from 'formik';

import FormikDropdown from '../FormikDropdown';
import TestForm from '../../../../../test/TestForm';

it('renders snapshot correctly', () => {
  const props = {
    id: 'fooSelect',
    label: 'select label',
    onChange: () => jest.fn(),
    options: [
      {
        label: 'foo_label',

        value: 'foo',
      },
      {
        label: 'bar_label',
        value: 'bar',
      },
    ],
  };
  const input = shallow(
    <TestForm>{() => <Field component={FormikDropdown} {...props} />}</TestForm>
  );
  expect(input.html()).toMatchSnapshot();
});
