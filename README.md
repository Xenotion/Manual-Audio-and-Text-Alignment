# Manual Audio/Text Alignment Project for C-LARA

**Team Name:** Team Slay

## Project Description

Welcome to the Manual Audio/Text Alignment Project for C-LARA, developed by Team Slay. This project addresses a critical need within C-LARA.

**C-LARA Overview:**

C-LARA is a rework of the Learning and Reading Assistant (LARA), enhanced by ChatGPT. Its primary goal is to revolutionize language learning experiences by creating high-quality multimedia content for language courses. Specifically, it generates and annotates short stories, which are used to enrich language courses with adaptable, engaging content.

**The Challenge:**

One of the major challenges in C-LARA is the manual alignment of audio with text. For smaller languages, automated transcription and alignment tools are not feasible due to the limited availability of data. Presently, Audacity is used for this task, which involves a complex and time-consuming process.

**Our Solution:**

Our project aims to simplify this process by creating a web-based audio alignment tool. Users can upload existing audio and text files from the C-LARA database, manually align the audio with the text, and have the output automatically uploaded to C-LARA. This tool streamlines the manual audio alignment process, making it more user-friendly and efficient.

## Table of Contents

- [Manual Audio/Text Alignment Project for C-LARA](#manual-audiotext-alignment-project-for-c-lara)
  - [Project Description](#project-description)
  - [Table of Contents](#table-of-contents)
  - [Installation and Setup](#installation-and-setup)
  - [How to Use the Tool](#how-to-use-the-tool)
  - [Key Classes \& Components](#key-classes--components)
    - [UserInputsView.vue](#userinputsviewvue)
    - [EditingView.vue](#editingviewvue)
    - [backendService.ts](#backendservicets)
  - [Contributors](#contributors)
  - [License](#license)

## Installation and Setup

To run the Manual Audio/Text Alignment Project for C-LARA locally, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies by running `npm install` or `yarn install`.
3. Configure the required settings, such as database connections or API keys.
4. Start the application with `npm start` or `yarn start`.
5. Access the tool in your web browser.

Alternatively, visit [our site](https://manual-alignment.netlify.app/)

## How to Use the Tool

Once the tool is set up and running, you can use it to align audio with text as follows:

1. **Upload Files:** Upload your audio and text files locally, or from a C-LARA project.
2. **Align Audio:** Manually align segments of audio with corresponding text by assigning segment numbers.
3. **Generate Output:** Once alignment is complete, choose between downloading the output or uploading it to C-LARA.
4. **View Aligned Content:** Check the C-LARA platform to see your newly aligned multimedia content.


## Key Classes & Components

### [UserInputsView.vue](src/components/UserInputsView.vue)
- Entry point for user data input in Vue.js.
- Encompasses fields for usernames, audio files, and text files.
- The "Next" button triggers the `toEditingPage` method for smooth validation and transition.
- Handles file changes (audio and text) through the `onAudioFileChanged` and `onTextFileChanged` methods.

### [EditingView.vue](src/components/EditingView.vue)
- Vue.js component for intuitive segmented audio data editing.
- Template includes sections for usernames, audio file visualization (AudioWave component), and segmented text display.
- Sidebar lists created segments and offers a button for easy export of segment information.
- Script section includes methods for text file formatting, segment counting, and exporting segment data.
- Seamless integration of the AudioWave component for audio visualization.
- Relies on the BackendService for potential backend interactions.

### [backendService.ts](src/services/backendService.ts)
- Specifically designed for backend API interaction.
- Uses Axios for asynchronous HTTP requests.
- `getProjectFiles` method retrieves audio and text files from the C-LARA backend.
- `fetchAudioBlob` method efficiently converts audio URLs to Blobs.
- The `ProjectFiles` interface structures expected content (audio and text files).
- Smart utilization of environment variables, dynamically sourcing the API URL from the `.env` file for adaptability and maintainability.

## Contributors

This project was developed by Team Slay, 2023 Semester 2 COMP30023, The University of Melbourne

- [John An](https://github.com/Xenotion)
- [Kaiyuan Cui](https://github.com/kaiyuanCui)
- [Natasha Ngo](https://github.com/ngonatasha)
- [Alex Lee](https://github.com/alsgud)
- [Sherry Sun]()

We'd like to express our gratitude to the resources & tools that helped us during this project:

- [Wavesurfer.js](https://wavesurfer.xyz/)
- [Netlify](https://www.netlify.com)
- [ChatGPT](https://chat.openai.com)


## License

This project is open-source and is licensed under the MIT License.

**MIT License**

Copyright (c) 2023 Team Slay

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS," WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.





