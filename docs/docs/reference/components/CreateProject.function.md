---
title: CreateProject
sidebar_position: 25
---

# CreateProject

_A form component for creating and editing projects._

## Overview
This component provides a user interface for inputting all the necessary information to create a new project or update an existing one. It includes fields for title, description, project type (AI or Graphics), price, wallet address, and links to cloud-hosted datasets or blend files. It also allows users to upload a script or other additional files and to add multiple external links dynamically. The form's behavior (create or update) is controlled by the `isEditing` prop.

## Parameters
| Name | Type | Description |
|------|------|-------------|
| initial | `Partial<CreateProjectData>` | Initial data to populate the form fields, used for editing existing projects. |
| onCancel | `() => void` | A callback function to be executed when the user cancels the form. |
| onSubmit | `(data: CreateProjectData, file: File | null) => void` | A callback function to be executed when the form is submitted. It receives the form data and the uploaded file. |
| loading | `boolean` | A flag to indicate if the form is currently in a loading state (e.g., while submitting). |
| isEditing | `boolean` | A flag to determine if the form is in 'edit' mode, which changes the submit button's text. |

## Returns
A React element representing the project creation/editing form.

## Dependencies
- `react`

## Example
```typescript
This component is likely used in a modal or a dedicated page for creating or editing projects.
```

## Notes
This is a detailed guide for the `CreateProject` component.
- **Fields**: The form includes fields for all project details, including `title`, `description`, `project_type`, `price`, and `wallet_address`. It also supports dynamic external links and a file upload for scripts.
- **Create vs. Edit**:
  - To **create** a new project, render the component with `isEditing={false}`.
  - To **edit** an existing project, pass the project data to the `initial` prop and set `isEditing={true}`.
- **Callbacks**:
  - The `onSubmit` callback is the most important prop. It receives the final form data and the uploaded file, which you should then send to your backend API.
  - Example `initial` data: `{ title: 'My Project', price: 100 }`
  - Handling `onSubmit`:
    ```javascript
    const handleSubmit = (data, file) => {
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      if (file) {
        formData.append('file', file);
      }
      // send formData to API
    };
    ```
