import React, { useState } from "react";

const FORM_ENDPOINT =
  "https://public.herotofu.com/v1/2d609f90-8a5e-11ee-8e77-6510340256ae"; // TODO - update to the correct endpoint

const ContactForm = (props) => {
  const [submitted, setSubmitted] = useState(false);
  const { handleObjectClick } = props;
  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Form response was not ok");
        }

        setSubmitted(true);
      })
      .catch((err) => {
        // Submit the form manually
        e.target.submit();
      });
  };

  if (submitted) {
    return (
      <>
        <div className="pb-8">
          <div className="text-center font-roundo text-2xl text-[1rem] font-semibold text-slate-700">
            Thank you!
          </div>
          <div className="text-md text-center font-simplyrounded text-[0.5rem] text-slate-700">
            I will be in touch soon.
          </div>
          <button
            className="absolute left-[14px] top-[50px] ml-[14.8px] mr-1 rounded-[0.1rem] bg-blue-500 px-2 py-1 pt-[5px] text-[0.2rem] font-bold uppercase text-white outline-none transition-all duration-150 ease-linear hover:bg-blue-600"
            onClick={() => {
              setSubmitted(false);
              handleObjectClick(
                "exitComputerMonitor",
                [50, 40, 50],
                [0, 20, 0],
                1.1,
              );
            }}
          >
            Back
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="h-[110px] w-[180px]">
      <form
        className="h-full w-full pt-4"
        action={FORM_ENDPOINT}
        onSubmit={handleSubmit}
        method="POST"
      >
        <div className="mb-1 flex justify-center pt-0">
          <input
            type="text"
            placeholder="Your name"
            name="name"
            spellCheck="false"
            className="relative w-[150px] rounded-[0.1rem] border-0 bg-white px-[2px] py-[2px] text-[0.3rem] text-gray-600 placeholder-gray-400 shadow outline-none focus:outline-none focus:ring-[0.1rem]"
            required
          />
        </div>
        <div className="mb-1 flex justify-center pt-0">
          <input
            type="email"
            placeholder="Email"
            name="email"
            spellCheck="false"
            className="relative w-[150px] rounded-[0.1rem] border-0 bg-white px-[2px] py-[2px] text-[0.3rem] text-gray-600 placeholder-gray-400 shadow outline-none focus:outline-none focus:ring-[0.1rem]"
            required
          />
        </div>
        <div className="mb-1 flex justify-center pt-0">
          <textarea
            rows="4"
            placeholder="Your message"
            name="message"
            spellCheck="false"
            className="relative w-[150px] resize-none rounded-[0.1rem] border-0 bg-white px-[2px] py-[2px] text-[0.3rem] text-gray-600 placeholder-gray-400 shadow outline-none focus:outline-none focus:ring-[0.1rem]"
            required
          />
        </div>
        <div className="mb-1 flex pt-0">
          <button
            className="ml-[14.8px] mr-1 rounded-[0.1rem] bg-blue-500 px-2 py-1 text-[0.2rem] font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-blue-600"
            type="submit"
          >
            Send a message
          </button>
        </div>
      </form>
      <button
        className="absolute left-[47px] top-[83px] ml-[14.8px] mr-1 rounded-[0.1rem] bg-blue-500 px-2 py-1 text-[0.2rem] font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:bg-blue-600"
        onClick={() =>
          handleObjectClick(
            "exitComputerMonitor",
            [50, 40, 50],
            [0, 20, 0],
            1.1,
          )
        }
      >
        Back
      </button>
    </div>
  );
};

export default ContactForm;
