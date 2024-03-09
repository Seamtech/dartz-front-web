import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormField from '../../../global/forms/FormField'; // Adjust the import path as needed
import FormButton from '../../../global/forms/FormButton'; // Adjust the import path as needed

const FindPlayerForm = ({ onSearch }) => {
  const [searchType, setSearchType] = useState('id');

  const initialValues = {
    searchValue: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  const validationSchema = Yup.object({
    searchValue: Yup.string().when('searchType', {
      is: 'id',
      then: Yup.string().required('ID is required'),
    }),
    firstName: Yup.string().when('searchType', {
      is: 'name',
      then: Yup.string().required('First name is required'),
    }),
    lastName: Yup.string().when('searchType', {
      is: 'name',
      then: Yup.string().required('Last name is required'),
    }),
    email: Yup.string().email('Invalid email').when('searchType', {
      is: 'email',
      then: Yup.string().required('Email is required'),
    }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        let criteria = { type: searchType, value: '' };
        switch (searchType) {
          case 'id':
            criteria.value = values.searchValue;
            break;
          case 'name':
            criteria.value = `${values.firstName} ${values.lastName}`;
            break;
          case 'email':
            criteria.value = values.email;
            break;
          default:
            break;
        }
        onSearch(criteria);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="searchType">Search Type</label>
            <select
              name="searchType"
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
            >
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
          </div>
          {searchType === 'id' && <FormField name="searchValue" label="ID" type="text" />}
          {searchType === 'name' && <>
            <FormField name="firstName" label="First Name" type="text" />
            <FormField name="lastName" label="Last Name" type="text" />
          </>}
          {searchType === 'email' && <FormField name="email" label="Email" type="email" />}
          <FormButton type="submit" disabled={isSubmitting}>Search</FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default FindPlayerForm;
