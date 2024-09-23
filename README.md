# rojo-frontend
### User Story for a Web Application with "Activity Matching" Feature

#### **Overview**:

This web application is designed to match users in groups of 5 based on an algorithm. The users participate in various activities based on their preferences. A user can express their preferred activity and filter options based on their location. After the activity is created and a group is formed, a chat feature will allow participants to communicate. The platform offers different roles, and safety features are integrated to ensure a secure environment.

---

### **Key User Stories**:

---

### **1. User Registration and Profile Creation**:

As a user, I want to create an account by providing my email and password, so I can access the application features.

- **Acceptance Criteria**:
    - User must upload a profile picture during the registration process.
    - A confirmation email is sent to verify the user's account.
    - Mandatory fields include email, password, age, photo, and zone (location).

### **2. Setting Preferences for Activities**:

As a user, I want to be able to set preferences for activities I’m interested in, so the algorithm can match me with activities I enjoy.

- **Acceptance Criteria**:
    - Users can select from a list of available activities.
    - Users can express preferences or prioritize activities in order of interest.
    - Preferences are stored and can influence matching.

### **3. Activity Discovery Based on Location**:

As a user, I want to filter available activities by my geographic area, so I can join activities close to me.

- **Acceptance Criteria**:
    - Users can filter activities by location (zone).
    - Only activities in the selected area/zona will be shown to the user.

### **4. Activity Creation (Administrator Role)**:

As an administrator, I want to create an activity by specifying a title, area, date/time, and description, so other users can join.

- **Acceptance Criteria**:
    - Administrators can create events with fields such as title, area, activity type, description, and date/time.
    - Administrator must upload a cover photo for the activity.

### **5. Random/Question-based Matching Algorithm**:

As a user, I want to be randomly matched with four other users based on an algorithm, so I can participate in group activities.

- **Acceptance Criteria**:
    - The algorithm either randomly selects users or uses question-based criteria (like preferences or common interests).
    - Users are placed into groups of 5 for each activity.
    - The matching algorithm takes preferences, location, and availability into account.

### **6. Viewing and Joining Activities**:

As a user, I want to browse available activities and choose which one to join, so I can engage in activities I like.

- **Acceptance Criteria**:
    - Users can browse available activities based on area and preferences.
    - Each activity displays details such as title, description, date/time, and administrator.
    - Users can join any available activity if space is available.

### **7. Post-Activity Chat**:

As a user, I want to communicate with other participants via chat after we have been matched for an activity, so we can coordinate or discuss the event.

- **Acceptance Criteria**:
    - The chat feature only becomes available after the activity group has been formed.
    - Chat is available only to participants of the same activity.

### **8. View and Manage Events (Administrator Role)**:

As an administrator, I want to view a list of activities I have organized, so I can manage and edit them.

- **Acceptance Criteria**:
    - Administrators can view, edit, or delete activities they have created.
    - Administrators can see the participants in their events and interact with them.

### **9. Safety Button**:

As a user, I want access to a safety button, so I can report inappropriate behavior or feel secure in the environment.

- **Acceptance Criteria**:
    - The safety button is available on activity pages and chat windows.
    - When triggered, the safety button sends a report to the application administrators.

### **10. Profile and Event History Management**:

As a user, I want to manage my profile and see a history of events I’ve organized or participated in, so I can keep track of my involvement.

- **Acceptance Criteria**:
    - Users can update their photo, preferences, and zone in their profile settings.
    - Users can view a list of past and upcoming activities they have joined.
    - If the user is an administrator, they can see the events they have organized.

---

### **Entities (Database Design)**:

---

#### **Entity: Event**

- **Attributes**:
    - `area` (zone/region)
    - `title`
    - `date/time`
    - `activity`
    - `description`
    - `administrator` (User who organized the event)
    - `photos` (cover or activity-related images)

#### **Entity: User**

- **Attributes**:
    - `email`
    - `password`
    - `photo` (mandatory)
    - `zone` (geographic area)
    - `preferences` (activity preferences)
    - `age`
    - `IsAdministrator?` (boolean flag)
    - `organizedEvents` (List of events the user has organized)
    - `joinedEvents` (List of events the user has joined)

---

### **Roles**:

1. **Regular User**:
    
    - Can join activities.
    - Can view and manage their profile.
    - Can participate in post-activity chat.
    - Can report issues via the safety button.
2. **Administrator**:
    
    - Can create, edit, and manage activities.
    - Can view and manage participants.
    - Can organize activities in specific zones.

---

### **Additional Features**:

- **Email Confirmation**: Upon registration, users receive an email to confirm their account.
- **Safety Button**: A prominent feature allowing users to report issues or concerns regarding other participants or the activity environment.
- **Post-Matching Chat**: Only available after the activity group is formed.

---

This user history captures the essential functionality of the platform, from user registration to post-event communication, with features such as preference-based matching, activity filtering by location, and safety measures ensuring user security.