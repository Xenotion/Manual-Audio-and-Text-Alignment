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

- [UserInputsView.vue](src/components/UserInputsView.vue): Vue.js component serves as an interface for user data input, encompassing fields for username, audio, and text files. Notably, the "Next" button triggers the toEditingPage method, responsible for validating inputs and progressing to the editing page. File changes, both for audio and text, are handled by the onAudioFileChanged and onTextFileChanged methods. 
  
- [EditingView.vue](src/components/EditingView.vue): Vue.js component serves as the user interface for editing segmented audio data. In the template section, it features a main container with sections for username, audio file visualization using the AudioWave component, and segmented text display. The sidebar lists created segments and provides a button to export segment information. The script section includes methods for formatting text files, counting segments, and exporting segment data to a downloadable text file. The component integrates the AudioWave component for audio visualization and utilizes the BackendService for potential backend interactions. 
  
- [backendService.ts](src/services/backendService.ts): designed to interact with a backend API, specifically tailored for fetching project files related to a given project ID. The class employs Axios for making asynchronous HTTP requests, utilizing the getProjectFiles method to retrieve audio and text files from the C-LARA backend. The fetchAudioBlob method efficiently converts an audio URL to a Blob. The interface ProjectFiles structures the expected content, comprising audio and text files. The service employs environment variables, with the API URL dynamically sourced from the .env file. 

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





