"use client";

import { useState } from "react";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";

export default function StepperForm() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: "",
    language: "",
    facebook: "",
    twitter: "",
    linkedin: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step === 1) {
      if (!form.firstName || !form.lastName) return alert("All fields required!");
    }
    if (step === 2) {
      if (!form.country || !form.language) return alert("Please fill country & language!");
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Linear Stepper with Validation</h2>

      <div className="bg-white border rounded-lg shadow p-6">
        {/* STEP HEADER */}
        <div className="flex items-center justify-between mb-8">
          <StepStatus
            number={1}
            title="Account Details"
            subtitle="Enter your account details"
            active={step === 1}
            completed={step > 1}
          />
          <Line active={step > 1} />
          <StepStatus
            number={2}
            title="Personal Info"
            subtitle="Setup Information"
            active={step === 2}
            completed={step > 2}
          />
          <Line active={step > 2} />
          <StepStatus
            number={3}
            title="Social Links"
            subtitle="Add Social Links"
            active={step === 3}
            completed={false}
          />
        </div>

        {/* STEP CONTENT */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold">Personal Info</h3>
            <p className="text-sm text-gray-500 mb-4">Setup Information</p>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label>First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold">Personal Info</h3>
            <p className="text-sm text-gray-500 mb-4">Setup Information</p>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label>Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                >
                  <option value="">Select country</option>
                  <option>Bangladesh</option>
                  <option>India</option>
                  <option>USA</option>
                </select>
              </div>

              <div>
                <label>Language</label>
                <select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                >
                  <option value="">Select language</option>
                  <option>English</option>
                  <option>Bengali</option>
                  <option>Arabic</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold">Social Links</h3>
            <p className="text-sm text-gray-500 mb-4">Add Social Links</p>

            <div className="grid grid-cols-2 gap-4 mt-3">
              <div>
                <label>Facebook</label>
                <input
                  name="facebook"
                  value={form.facebook}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label>Twitter</label>
                <input
                  name="twitter"
                  value={form.twitter}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
              <div>
                <label>LinkedIn</label>
                <input
                  name="linkedin"
                  value={form.linkedin}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex justify-between mt-10">
          {step > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-4 py-2 border rounded bg-gray-50"
            >
              <ChevronLeft size={18} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button className="px-5 py-2 bg-green-500 text-white rounded">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepStatus({
  number,
  title,
  subtitle,
  active,
  completed,
}: {
  number: number;
  title: string;
  subtitle: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="text-center flex flex-col items-center w-full">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 
        ${completed ? "bg-indigo-500 text-white border-indigo-500" : ""}
        ${active ? "border-indigo-500 text-indigo-500" : "border-gray-300 text-gray-400"}
      `}
      >
        {completed ? <Check size={18} /> : number}
      </div>
      <div
        className={`mt-2 font-medium ${
          active ? "text-indigo-600" : "text-gray-600"
        }`}
      >
        {title}
      </div>
      <span className="text-xs text-gray-400">{subtitle}</span>
    </div>
  );
}

function Line({ active }: { active: boolean }) {
  return (
    <div
      className={`h-0.5 flex-1 mx-3 ${
        active ? "bg-indigo-500" : "bg-gray-300"
      }`}
    ></div>
  );
}
