# rojo-Frontend

## **User Story for a Web Application with "Activity Matching" Feature**

### **Overview**:

This web application is designed to match users in groups of 5 based on an algorithm that considers preferences and location. Users can explore activities, but can only join them after being matched by the algorithm. Chat functionality is created automatically once the event is formed. The platform includes categories, blog articles, and roles such as users,  administrators and visitors.

---

## **Key User Stories**:

---

### **1. Visitor Registration and Profile Creation**:

As a Visitor, I want to create an account by providing my email and password, so I can access the application features.

- **Acceptance Criteria**:
    - Visitor must upload a profile picture during the registration process.
    - A confirmation email is sent to verify the user's account.
    - Mandatory fields include email, password, date of birth, photo, and zone (location).

### **2. Setting Preferences for Activities**:

As a user, I want to be able to set preferences for activities I’m interested in, so the algorithm can match me with activities I enjoy.

- **Acceptance Criteria**:
    - Users can select from a list of available categories (e.g., sports, dancing).
    - Users can choose one or more categories for matching.
    - Preferences are stored and influence the matching algorithm.

### **4. Activity Discovery Based on Location**:

As a user, I want to filter available activities by my geographic area, so I can join activities close to me.

- **Acceptance Criteria**:
    - Users can filter activities by city.
    - Only activities in the selected city will be displayed.

### **4. Activity Creation (Administrator Role)**:

As an administrator, I want to create an activity by specifying a title, city, date/time, and description, so other users can be matched.

- **Acceptance Criteria**:
    - Administrators can create events with fields such as title, city, category, description, and date/time.
    - Administrator must upload a cover photo for the activity.

### **5. Category-based Matching Algorithm**:

As a user, I want to be matched with four other users based on an algorithm, so I can participate in group activities.

- **Acceptance Criteria**:
    - The algorithm matches users based on selected categories, city, and availability.
    - Users are placed into groups of 5 for each activity.
    - Only the algorithm can suggest and form activity groups; users cannot select them directly.
    - The algortithm will match the users based on location, the prefences and on the result of the questionnaire.

### **6. Viewing and Joining Activities**:

As a user, I want to browse available activities, but only the algorithm can assign me to one.

- **Acceptance Criteria**:
    - Users can browse activities on the homepage but cannot directly join or book them.
    - The algorithm suggests and assigns activities based on category and city.

### **7. Post-Activity Chat**:

As a user, I want to communicate with other participants via chat after we have been matched for an activity.

- **Acceptance Criteria**:
    - A chat is automatically created when the event is formed for the group of 5.
    - Chat is only available for participants of the same activity.

### **8. View and Manage Events (Administrator Role)**:

As an administrator, I want to view and manage the activities I have created.

- **Acceptance Criteria**:
    - Administrators can view, edit, or delete events they have created.
    - Administrators can view participants and interact with them.

### **9. Safety Button**:

As a user, I want access to a safety button, so I can report inappropriate behavior or feel secure in the environment.

- **Acceptance Criteria**:
    - The safety button is available on activity pages and chat windows.
    - When triggered, the safety button sends a report to the application administrators.

### **10. Profile and Event History Management**:

As a user, I want to manage my profile and see a history of events I’ve participated in, so I can keep track of my involvement.

- **Acceptance Criteria**:
    - Users can update their photo, preferences, and city in their profile settings.
    - Users can view a list of past and upcoming activities.
    - Administrators can see events they have organized.

---

## **Entities (Database Design)**:

---

### **Entity: Event**

- **Attributes**:
    - `city` (zone/region)
    - `title`
    - `date/time`
    - `Location`
    - `category`
    - `description`
    - `administrator` (User who organized the event)
    - `photos` (cover or activity-related images)
    - `modifiedAt`
	- `createdAt`
	- `deletedAt`

### **Entity: User**

- **Attributes**:
    - `email`
    - `password`
    - `photo` (mandatory)
    - `city` (geographic area)
    - `preferences` (category preferences)
    - `dateOfBirth`
    - `isAdministrator` (boolean flag)
    - `organizedEvents` (List of events the user has organized)
    - `joinedEvents` (List of events the user has joined)
    - `modifiedAt`
	- `createdAt`
	- `deletedAt`

### **Entity: City**

- **Attributes**:
    - `cityId`
    - `name` (city name)
    - `state` 
    - `country`
    - `latitude` (optional)
    - `longitude` (optional)
    - `modifiedAt`
	- `createdAt`
	- `deletedAt`

### **Entity: Category**

- **Attributes**:
    - `categoryId`
    - `name` (e.g., sports, dancing)
    - `ParentCategory`
    - `modifiedAt`
	- `createdAt`
	- `deletedAt`

### **Entity: Location**

- **Attributes**:
    - `LocationID`
    - `Name`
    - `Address`
    - `City`
    - `State`
    - `Country`
    - `PostalCode`
    - `Latitude` (optional)
    - `Longitude` (optional)
    - `LocationType`
    - `CreatedAt`
    - `ModifiedAt`
    - `deletedAt`

### **Entity: State**

- **Attributes**:
    - `StateID`
    - `Name`
    - `CountryID`
    - `Abbreviation` (optional)
    - `Timezone` (optional)
    - `CreatedAt`
    - `ModifiedAt`
    - `deletedAt`

### **Entity: Country**

- **Attributes**:
    - `CountryID`
    - `StateID`
    - `Name`
    - `ISOCode`
    - `Capital`
    - `OfficialLanguage` (optional)
    - `Timezone` (optional)
    - `CreatedAt`
    - `ModifiedAt`
    - `DeletedAt`

### **Entity: Chat**

- **Attributes**:
    - `chatId`
    - `eventId`
    - `CreatedAt`
    - `ModifiedAt`
    - `DeletedAt`

### **Entity: Message**

- **Attributes**:
    - `messageId`
    - `chatId`
    - `content`
    - `senderId`
    - `CreatedAt`
    - `ModifiedAt`
    - `DeletedAt`

### **Entity: Blog Article**

- **Attributes**:
    - `articleId`
    - `title`
    - `content`
    - `authorId`
    - `CategoryId`
    - `CreatedAt`
    - `ModifiedAt`
    - `DeletedAt`

---

## **Roles**:

1. **Regular User**:
    - Can browse activities.
    - Can leave the activity.
    - Can manage their profile.
    - Can join activities after being matched by the algorithm.
    - Can chat with other participants after being matched.
    - Can report issues via the safety button.
    - Can recover the password.

2. **Administrator**:
    - Can create, edit, and manage activities.
    - Can manage categories.
    - Can view and manage participants.
    - Can organize activities in specific cities.
    - Can delete events
    - Can delete users

3. **Visitor**
    - Can signup on the Social network and become a user

---

## **Blog**:

    - The blog is to review the exeperience.

---

## **Additional Features**:

- **Email Confirmation**: Upon registration, users receive an email to confirm their account.
- **Safety Button**: Allows users to report issues or concerns.
- **Post-Matching Chat**: Only available after the group is formed for an activity.
- **Payment Integration** (planned - To be rediscussed): Payment could be implemented once the user is matched and has joined an activity.

---

## **Algorithm Rules**:

- Users can select one or more categories of activities.
- The algorithm will match users based on category, city, and availability.
- Users cannot directly join or book activities; the algorithm handles group assignment.
- Users cannot choose their group; the algorithm forms groups automatically.

---
