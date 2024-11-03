import Buttons from '../atoms/Buttons';

import InputText from '../atoms/InputText';
import React, {useState, useRef} from 'react';
import CustomAlert from '../atoms/CustomAlert';
import SettingsMenu from '../atoms/SettingsMenu';

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
    <div className="flex h-full w-full justify-center">
      <div className="flex h-full w-50 max-w-[1200px] items-start mobile:flex-col mobile:gap-0 pt-10">
        <SettingsMenu className="w-1/3 mobile:w-full mobile:mb-6">
          <i
            className="fas fa-arrow-left cursor-pointer"
            onClick={() => window.history.back()}
          ></i>
          <span className="w-full text-heading-3 font-heading-3 font-bold text-default-font">
            Settings
          </span>
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full flex-col items-start gap-1">
              <SettingsMenu.Item selected={true} label="Account" />
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <span className="w-full text-body-bold  font-bold font-body-bold text-default-font">
              Workspace
            </span>
            <div className="flex w-full flex-col items-start gap-1">
            <div>
            <div>
    
      <a href="/CreateEventForm" className="bg-gray-600 hover:bg-blue-800 text-white font-bold py-1 px-2 rounded">
        Register new Event
      </a>
    </div>
</div>
            </div>
          </div>
        </SettingsMenu>

        <div className="container max-w-none flex grow shrink-0 basis-0 flex-col items-center gap-6 self-stretch bg-default-background py-6 px-5 shadow-sm">
          <div className="flex w-full max-w-[576px] flex-col items-start gap-6">
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
                   {/* <div className="flex items-center gap-4">
                  <img
                    className="h-16 w-16 flex-none object-cover [clip-path:circle()]"
                   src="https://res.cloudinary.com/subframe/image/upload/v1711417513/shared/kwut7rhuyivweg8tmyzl.jpg"
                    alt="User Profile"
                  /> 
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <i className="fas fa-pencil-alt text-gray-700 hover:text-gray-900"></i>
                  </label>
                </div> */}
              </div>
              <div>
                <InputText
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  ref={refs.firstname}
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 min-w-[400px]"
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
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  min-w-[400px]"
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
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5   w-88  min-w-[400px]"
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
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5   min-w-[400px]"
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
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  w-88 min-w-[400px]"
                  required
                />
              </div>
            </div>
            
              <Buttons
                type="submit"
                value="Save Settings"
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              />
            

            <div className="flex h-px w-full flex-none flex-col items-center gap-6 bg-neutral-border" />
            <div className="flex w-full flex-col items-start gap-6">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Password
              </span>
              <InputText
                type="password"
                placeholder="Current Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={refs.password}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 "
                required
              />
              <InputText
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={refs.password}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5   min-w-[400px]"
              />
              <InputText
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  min-w-[400px]"
                label=""
                helpText=""
                type="password"
                placeholder="Re-type new password"
                value=""
                onChange={() => {}}
              />
            </div>
        
              <Buttons
                type="submit"
                value="Change Password"
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              />
        

            <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-border" />
            <div className="flex w-full flex-col items-start gap-6">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Danger zone
              </span>
              <CustomAlert
                variant="error"
                icon={null}
                title="Delete account"
                description=" Permanently remove your account. This action is not reversible."
                actions={
                  <Buttons
                    type="submit"
                    value="Delete account"
                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {}}
                  >
                    Delete account
                  </Buttons>
                }
              />
            </div>
          </div>
        </div>
        </div>
    </div>
  );
};