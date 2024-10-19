


//import Alert from "../atoms/Alert";
//import Button from "../atoms/Buttons";
import InputText from "../atoms/InputText";
import React, { useState, useRef} from 'react';



export const UserSettingsForm = () => {

    const [firstname, setFirstname] = useState('');
          const [lastname, setLastname] = useState('');
          const [email, setEmail] = useState('');
          const [password, setPassword] = useState('');
          
          const [dateOfBirth, setDateOfBirth] = useState('');


          const refs = {
            firstname: useRef(null),
            lastname: useRef(null),
            email: useRef(null),
            password: useRef(null),
            city: useRef(null),
            dateOfBirth: useRef(null),
  };
    return (

      

    
        <div className="container max-w-none flex grow shrink-0 basis-0 flex-col items-center gap-6 self-stretch bg-default-background py-12 shadow-sm">
            <div className="flex w-full max-w-[576px] flex-col items-start gap-12">
                <div className="flex w-full flex-col items-start gap-1">
                    <span className="w-full   text-3xl font-bold  text-heading-2 font-heading-2 text-default-font">
                        Account
                    </span>
                    <span className="w-full text-body font-body text-subtext-color">
                        Update your profile and personal details here
                    </span>
                </div>
                <div className="flex w-full flex-col items-start gap-6">
                    <span className="text-heading-3  font-bold  font-heading-3 text-default-font">
                        Profile
                    </span>
                    <div className="flex w-full flex-col items-start gap-4">
                        <span className="text-body-bold font-body-bold text-default-font">
                         Photo Profile
                        </span>
                        <div className="flex items-center gap-4">
                            <img
                                className="h-16 w-16 flex-none object-cover [clip-path:circle()]"
                                src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
                                alt="User Profile" 
                            />
                              <label htmlFor="image-upload" className="cursor-pointer">
            <i className="fas fa-pencil-alt text-gray-700 hover:text-gray-900"></i>
        </label>
                        </div>
                        
                    </div>
                    <div>
                                                            <InputText
                                                                      type="text"
                                                                      placeholder="First Name"
                                                                      value={firstname}
                                                                      onChange={(e) => setFirstname(e.target.value)}
                                                                      ref={refs.firstname}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  w-96"
                                                                      required
                                                            />
                                                  </div>
                                                  <div>
                                                            <InputText
                                                                      type="text"
                                                                      placeholder="Last Name"
                                                                      value={lastname}
                                                                      onChange={(e) => setLastname(e.target.value)}
                                                                      ref={refs.lastname}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-3.5 w-96"
                                                                      required
                                                            />
                                                  </div>

                                                  <div>
                                                            <InputText
                                                                      type="email"
                                                                      placeholder="Email"
                                                                      value={email}
                                                                      onChange={(e) => setEmail(e.target.value)}
                                                                      ref={refs.email}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  w-96"
                                                                      required
                                                            />
                                                  </div>

                                                  <div>
                                                            <InputText
                                                                      type="password"
                                                                      placeholder="Password"
                                                                      value={password}
                                                                      onChange={(e) => setPassword(e.target.value)}
                                                                      ref={refs.password}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  w-96"
                                                                      required
                                                            />
                                                  </div>
                                                  <div>
                                                            <InputText
                                                                      type="date"
                                                                      placeholder="Date of Birth"
                                                                      value={dateOfBirth}
                                                                      onChange={(e) => setDateOfBirth(e.target.value)}
                                                                      ref={refs.dateOfBirth}
                                                                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-96"
                                                                      required
                                                            />
                                                  </div>



                </div>
           
            </div>
        
        </div>
    );
};
    

