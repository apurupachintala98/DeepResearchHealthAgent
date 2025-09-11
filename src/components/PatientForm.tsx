
//ssn added
"use client";

import React, { useMemo, useState } from "react";

export type PatientFormValues = {
  firstName: string;
  lastName: string;
  dob: string; // yyyy-mm-dd
  gender: "Male" | "Female" | "Non-binary" | "Prefer not to say" | "";
  zip: string;
  ssn: string;
};

type Props = {
  onSubmit: (values: PatientFormValues) => void;
  initialValues?: Partial<PatientFormValues>;
};

type Errors = Partial<Record<keyof PatientFormValues, string>>;

const nameRegex = /^[A-Za-z][A-Za-z\-'\s]{1,29}$/;
const zipRegex = /^\d{5}(-\d{4})?$/;
const ssnRegex = /^\d{9}$/;

function validate(values: PatientFormValues): Errors {
  const errs: Errors = {};
  if (!values.firstName.trim()) errs.firstName = "First name is required.";
  else if (!nameRegex.test(values.firstName.trim()))
    errs.firstName = "Only letters, spaces, apostrophes, hyphens. 2–30 chars.";

  if (!values.lastName.trim()) errs.lastName = "Last name is required.";
  else if (!nameRegex.test(values.lastName.trim()))
    errs.lastName = "Only letters, spaces, apostrophes, hyphens. 2–30 chars.";

  if (!values.dob) errs.dob = "Date of birth is required.";
  else {
    const d = new Date(values.dob);
    const today = new Date();
    if (isNaN(d.getTime())) errs.dob = "Invalid date.";
    else if (d > today) errs.dob = "Date cannot be in the future.";
    else {
      const age =
        today.getFullYear() -
        d.getFullYear() -
        (today < new Date(today.getFullYear(), d.getMonth(), d.getDate()) ? 1 : 0);
      if (age < 0 || age > 120) errs.dob = "Please enter a realistic date of birth.";
    }
  }

  if (!values.gender) errs.gender = "Please select a gender option.";

  if (!values.zip.trim()) errs.zip = "Zip code is required.";
  else if (!zipRegex.test(values.zip.trim()))
    errs.zip = "Enter a valid US ZIP (12345 or 12345-6789).";

  if (!values.ssn.trim()) errs.ssn = "SSN is required.";
  else if (!ssnRegex.test(values.ssn.trim()))
    errs.ssn = "SSN must be exactly 9 digits.";

  return errs;
}

export const PatientForm: React.FC<Props> = ({ initialValues, onSubmit }) => {
  const [values, setValues] = useState<PatientFormValues>({
    firstName: initialValues?.firstName ?? "",
    lastName: initialValues?.lastName ?? "",
    dob: initialValues?.dob ?? "",
    gender: initialValues?.gender ?? "",
    zip: initialValues?.zip ?? "",
    ssn: initialValues?.ssn ?? "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const errs = useMemo(() => validate(values), [values]);
  const isValid = Object.keys(errs).length === 0;

  function setField<K extends keyof PatientFormValues>(key: K, v: PatientFormValues[K]) {
    setValues((s) => ({ ...s, [key]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      dob: true,
      gender: true,
      zip: true,
      ssn: true,
    });

    if (!isValid) return;

    onSubmit(values); // ✅ Pass form data to parent
  }

  return (
    <div className="flex justify-end w-full" style={{ pointerEvents: "auto", position: "relative", zIndex: 10 }}>
      <form
        className="card"
        onSubmit={handleSubmit}
        noValidate
        style={{ width: "100%", maxWidth: 600, minHeight: 429, padding: 24 }}
      >
        <div className="card__header">
          <div className="card__title">Patient Information</div>
          <div aria-hidden className="progress">
            <div className="progress__bar" style={{ width: "100%" }} />
          </div>
        </div>

        <div className="grid">
          {/* First Name */}
          <div className="field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={values.firstName}
              onChange={(e) => setField("firstName", e.target.value)}
              onBlur={() => setTouched((s) => ({ ...s, firstName: true }))}
              aria-invalid={!!errs.firstName}
              aria-describedby="firstName-error"
              required
            />
            {touched.firstName && errs.firstName && (
              <p id="firstName-error" className="error">{errs.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={values.lastName}
              onChange={(e) => setField("lastName", e.target.value)}
              onBlur={() => setTouched((s) => ({ ...s, lastName: true }))}
              aria-invalid={!!errs.lastName}
              aria-describedby="lastName-error"
              required
            />
            {touched.lastName && errs.lastName && (
              <p id="lastName-error" className="error">{errs.lastName}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="field">
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              name="dob"
              type="date"
              max={new Date().toISOString().slice(0, 10)}
              value={values.dob}
              onChange={(e) => setField("dob", e.target.value)}
              onBlur={() => setTouched((s) => ({ ...s, dob: true }))}
              aria-invalid={!!errs.dob}
              aria-describedby="dob-error"
              required
            />
            {touched.dob && errs.dob && (
              <p id="dob-error" className="error">{errs.dob}</p>
            )}
          </div>

          {/* Gender */}
          <div className="field">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={values.gender}
              onChange={(e) => setField("gender", e.target.value as any)}
              onBlur={() => setTouched((s) => ({ ...s, gender: true }))}
              aria-invalid={!!errs.gender}
              aria-describedby="gender-error"
              required
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              {/* <option>Non-binary</option>
              <option>Prefer not to say</option> */}
            </select>
            {touched.gender && errs.gender && (
              <p id="gender-error" className="error">{errs.gender}</p>
            )}
          </div>

          {/* SSN */}
          <div className="field">
            <label htmlFor="ssn">SSN</label>
            <input
              id="ssn"
              name="ssn"
              type="text"
              inputMode="numeric"
              placeholder="123456789"
              value={values.ssn}
              onChange={(e) => setField("ssn", e.target.value)}
              onBlur={() => setTouched((s) => ({ ...s, ssn: true }))}
              aria-invalid={!!errs.ssn}
              aria-describedby="ssn-error"
              required
            />
            {touched.ssn && errs.ssn && (
              <p id="ssn-error" className="error">{errs.ssn}</p>
            )}
          </div>

          {/* Zip Code */}
          <div className="field">
            <label htmlFor="zip">Zip Code</label>
            <input
              id="zip"
              name="zip"
              type="text"
              inputMode="numeric"
              placeholder="12345 or 12345-6789"
              value={values.zip}
              onChange={(e) => setField("zip", e.target.value)}
              onBlur={() => setTouched((s) => ({ ...s, zip: true }))}
              aria-invalid={!!errs.zip}
              aria-describedby="zip-error"
              required
            />
            {touched.zip && errs.zip && (
              <p id="zip-error" className="error">{errs.zip}</p>
            )}
          </div>
        </div>

        <button className="btn btn--primary" type="submit" disabled={!isValid} aria-disabled={!isValid}>
          Analyze Patient Health
        </button>

        {!isValid && (
          <p className="hint" role="status">
            Complete all required fields to continue.
          </p>
        )}
      </form>
    </div>
  );
};
