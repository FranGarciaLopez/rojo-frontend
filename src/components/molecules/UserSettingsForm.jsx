import Buttons from '../atoms/Buttons';
import Label from '../atoms/Label';
import InputText from '../atoms/InputText';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomAlert from '../atoms/CustomAlert';
import SettingsMenu from '../atoms/SettingsMenu';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

export const UserSettingsForm = () => {
     const [setError] = useState('');
     const [firstname, setFirstname] = useState('');
     const [lastname, setLastname] = useState('');
     const [email, setEmail] = useState('');
     const [dayOfTheWeek, setdayOfTheWeek] = useState('');
     const [preferedCategory, setPreferedCategory] = useState('');
     const [preferedCity, setPreferedCity] = useState('');

     const { authToken } = useContext(AuthContext);
     const [isAdmin, setIsAdmin] = useState(false);
     const navigate = useNavigate();

     const refs = {
          firstname: useRef(null),
          lastname: useRef(null),
          email: useRef(null),
          dayOfTheWeek: useRef(null),
          preferedCategory: useRef(null),
          preferedCity: useRef(null),
     };

     useEffect(() => {
          const fetchUser = async () => {
               try {
                    const response = await fetch('http://localhost:3000/user', {
                         headers: { Authorization: `Bearer ${authToken}` },
                    });
                    const data = await response.json();
                    setIsAdmin(data.user.isAdministrator);
                    setFirstname(data.user.firstname);
                    setLastname(data.user.lastname);
                    setEmail(data.user.email);
                    setdayOfTheWeek(data.user.dayOfTheWeek);
                    setPreferedCategory(data.user.categoryName.categoryName);
                    setPreferedCity(data.user.preferedCity.name);
               } catch (error) {
                    console.log('Error fetching user data', error);
                    setError(error);
               }
          };
          fetchUser();
     }, [authToken]);

     return (
          <>
          <NavBar />
          <div className="centered-elements">
               <div className="flex flex-col h-full p-6 gap-6 xl:flex-row">

                    {/* Sidebar - Settings Menu */}
                    <SettingsMenu>
                         <i className="fas fa-arrow-left cursor-pointer" onClick={() => navigate(-1)}></i>
                         <span>Settings</span>
                         <SettingsMenu.Item selected={true} label="Account" />
                         {isAdmin && (
                              <Link to="/CreateEventForm" className="w-full">
                                   <SettingsMenu.Item selected={false} label="Create new event" />
                              </Link>
                         )}
                    </SettingsMenu>

                    {/* Formulario */}
                    <form>
                         <h2>Account</h2>
                         <p>Update your profile and personal details here</p>

                         <div className="flex flex-col gap-4 w-full">
                              <Label>First Name</Label>
                              <InputText
                                   type="text"
                                   value={firstname}
                                   onChange={(e) => setFirstname(e.target.value)}
                                   ref={refs.firstname}
                                   required
                              />

                              <Label>Last Name</Label>
                              <InputText
                                   type="text"
                                   value={lastname}
                                   onChange={(e) => setLastname(e.target.value)}
                                   ref={refs.lastname}
                                   required
                              />

                              <Label>Email</Label>
                              <InputText
                                   type="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   ref={refs.email}
                                   required
                              />

                              <Label>Day of the week</Label>
                              <InputText
                                   type="text"
                                   value={dayOfTheWeek}
                                   onChange={(e) => setdayOfTheWeek(e.target.value)}
                                   ref={refs.dayOfTheWeek}
                                   required
                              />
                         </div>



                         {/* show preferedCity, dayOfTheWeek and preferedCategory (categoryName)  */}
                         <h3>Preferences</h3>
                         <div className="flex flex-col gap-4 w-full">

                              <Label>Prefered City</Label>
                              <InputText
                                   type="text"
                                   value={preferedCity}
                                   onChange={(e) => setPreferedCity(e.target.value)}
                                   ref={refs.preferedCity}
                                   required
                              />

                              <Label>Day of the week</Label>
                              <InputText
                                   type="text"
                                   value={dayOfTheWeek}
                                   onChange={(e) => setdayOfTheWeek(e.target.value)}
                                   ref={refs.dayOfTheWeek}
                                   required
                              />

                              <Label>Prefered Category</Label>
                              <InputText
                                   type="text"
                                   value={preferedCategory}
                                   onChange={(e) => setPreferedCategory(e.target.value)}
                                   ref={refs.preferedCategory}
                                   required
                              />
                         </div>
                         <Buttons
                              type="submit"
                              value="Save Settings"
                              className="mt-4 bg-blue-600 hover:bg-blue-800"
                         />
                         <div className="mt-10">
                              <h3>Danger zone</h3>
                              <CustomAlert
                                   variant="error"
                                   title="Delete account "
                                   description="Permanently remove your account. This action is not reversible."
                                   actions={
                                        <Buttons
                                             type="button"
                                             value="Delete account"
                                             className="bg-red-600 hover:bg-red-800"
                                             onClick={() => { }}
                                        />
                                   }
                              />
                         </div>
                    </form>
               </div>
          </div>
          </>
     );
};
