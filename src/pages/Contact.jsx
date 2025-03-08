import React from "react";
import contactConfig from "../components/contactConfig";

const Contact = ({ chatbotVisible }) => {
  return (
    <div
      className={`flex flex-col transition-all duration-500 ${
        chatbotVisible ? "gap-[5rem]" : "gap-[10rem]"
      }`}
    >
      <div>
        <main className="w-full">
          <div className="px-[10%] my-20">
            <div className="mb-5 mt-3 w-full">
              <div className="">
                <h1 className="text-4xl mb-4 tracking-tighter">Contact Us</h1>
                <hr className="border-t-2 border-primary-color my-4 ml-0" />
              </div>
            </div>

            <div className="flex relative">
              <div className="details w-1/2 flex flex-col gap-4 h-full">
                <h3 className="text-secondary-color">Get in touch</h3>
                <address className="flex flex-col">
                  <strong>Email:</strong>
                  <a
                    href={`mailto:${contactConfig.YOUR_EMAIL}`}
                    className="hover:underline"
                  >
                    {contactConfig.YOUR_EMAIL}
                  </a>

                  {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                    <>
                      <strong className="pt-4">Phone:</strong>
                      <a href="" className="hover:underline">
                        {contactConfig.YOUR_FONE}
                      </a>
                    </>
                  ) : (
                    ""
                  )}
                </address>
                <p className="text-sm absolute bottom-0 left-0">{contactConfig.description}</p>
              </div>

              <div className="userinput w-1/2">
                <form className="w-full flex flex-col">
                  <div className="formContent flex flex-col gap-4 w-full">
                    <input
                      className="form-input w-full text-black rounded-md border border-black px-3 py-2"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      required
                    />
                    <input
                      className="form-input w-full text-black rounded-md border border-black px-3 py-2"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                    <textarea
                      className="form-input rounded-md border border-black w-full text-black px-3 py-2"
                      id="message"
                      name="message"
                      placeholder="Message"
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <button
                    className="mt-4 w-full bg-[#FF6600] px-4 py-3 rounded-md text-white text-center"
                    type="submit"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contact;
