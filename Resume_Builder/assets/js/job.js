import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyAEceXlULh5qzpithc9co-s4jn4LytPPn4"; // Replace with your actual API key
            const genAI = new GoogleGenerativeAI(API_KEY);
            document.getElementById("jobRecommendationBtn").addEventListener("click", getJobRecommendations);

        
            async function getJobRecommendations() {
                clearJobRecommendations();
                const skills = getSkills();
                const jobRecommendations = await generateJobRecommendations(skills);
                displayJobRecommendations(jobRecommendations);
            }
            function clearJobRecommendations() {
                const recommendationsContainer = document.querySelector(".job-recommendations");
                recommendationsContainer.innerHTML = ""; // Clear job recommendations
            }
            async function generateJobRecommendations(skills) {
                showSpinner();
                const model = genAI.getGenerativeModel({ model: "gemini-pro" });
                const results = await Promise.all(skills.map(skill => model.generateContent(skill + "jobs with companies links ")));
                const jobRecommendations = results.flatMap(result => {
                    const response = result.response;
                    return response.text().split("\n\n");
                });
                hideSpinner();
                return jobRecommendations;
               
            }
            function convertMarkdownToHtml(markdownText) {
    const md = window.markdownit();
    return md.render(markdownText);
}
            function displayJobRecommendations(jobRecommendations) {
                const recommendationsContainer = document.querySelector(".job-recommendations");
                recommendationsContainer.innerHTML = convertMarkdownToHtml(jobRecommendations.join("\n\n"));
            
                // Select all anchor elements within the recommendations container
                const links = recommendationsContainer.querySelectorAll("a");
            
                // Loop through each anchor element
                links.forEach(link => {
                    // Check if the anchor element's href attribute starts with "http"
                    if (link.href && link.href.startsWith("http"))  {
                        // Set the target attribute to "_blank" to open the link in a new tab
                        link.setAttribute("target", "_blank");
                        // Make sure the link is active
                        link.setAttribute("rel", "noopener noreferrer");
                    }
                });
            }
            
        
            function getSkills() {
                const skillsInputs = document.querySelectorAll(".skill");
                const skills = [];
                skillsInputs.forEach(input => {
                    const skill = input.value.trim();
                    if (skill) {
                        skills.push(skill);
                    }
                });
                return skills;
            }

            const spinnerContainer = document.querySelector('.spinner-container');

    // async function getJobRecommendations() {
    //     showSpinner();
    //     const skills = getSkills();
    //     const jobRecommendations = await generateJobRecommendations(skills);
    //     displayJobRecommendations(jobRecommendations);
    //     hideSpinner();
    // }

    function showSpinner() {
        spinnerContainer.style.display = 'block';
    }

    function hideSpinner() {
        spinnerContainer.style.display = 'none';
    }