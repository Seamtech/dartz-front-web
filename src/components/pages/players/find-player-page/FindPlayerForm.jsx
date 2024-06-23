import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "../../../global/forms/FormField";
import FormButton from "../../../global/forms/FormButton";
import { Container } from 'react-bootstrap';

const FindPlayerForm = ({ onSearch }) => {
  const [searchType, setSearchType] = useState("id");
  const initialValues = {
    searchValue: "",
    firstName: "",
    lastName: "",
    username: "",
  };

  const validationSchema = Yup.object({
    searchValue: Yup.string().when("searchType", {
      is: "id",
      then: Yup.string().required("Player ID is required"),
    }),
    firstName: Yup.string().when("searchType", {
      is: "name",
      then: Yup.string().required("First name is required"),
    }),
    lastName: Yup.string().when("searchType", {
      is: "name",
      then: Yup.string().required("Last name is required"),
    }),
    username: Yup.string().when("searchType", {
      is: "username",
      then: Yup.string().required("Username is required"),
    }),
  });

  return (
    <Container className="form-container">
      <h3 className="sovjet-section-heading">Lookup Type</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          let criteria = { type: searchType, value: "" };
          switch (searchType) {
            case "id":
              criteria.value = values.searchValue;
              break;
            case "name":
              criteria.value = `${values.firstName} ${values.lastName}`;
              break;
            case "username":
              criteria.value = values.username;
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
              <select
                name="searchType"
                onChange={(e) => {
                  setSearchType(e.target.value);
                }}
              >
                <option value="id">Player ID</option>
                <option value="name">Name</option>
                <option value="username">Username</option>
              </select>
            </div>
            {searchType === "id" && (
              <FormField name="searchValue" label="Player ID" type="text" />
            )}
            {searchType === "name" && (
              <>
                <FormField name="firstName" label="First Name" type="text" />
                <FormField name="lastName" label="Last Name" type="text" />
              </>
            )}
            {searchType === "username" && (
              <FormField name="username" label="Username" type="text" />
            )}
            <FormButton type="submit" disabled={isSubmitting}>
              Search
            </FormButton>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default FindPlayerForm;
