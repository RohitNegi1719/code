// Function to handle language selection
function selectLanguage(language) {
    const languageIcons = document.querySelectorAll('.language-icons i');
    languageIcons.forEach(icon => {
      icon.classList.remove('selected');
      if (icon.dataset.lang === language) {
        icon.classList.add('selected');
      }
    });
  
    // Update message in code editor
    const codeEditor = document.getElementById('codeEditor');
    codeEditor.placeholder = `Write your code in ${language} here`;
  }
  
  // Event listener for language icon clicks
  document.querySelectorAll('.language-icons i').forEach(icon => {
    icon.addEventListener('click', function() {
      const language = this.dataset.lang;
      selectLanguage(language);
    });
  });
  
  // Event listener for run button click
  document.getElementById('runButton').addEventListener('click', function() {
    const codeEditor = document.getElementById('codeEditor');
    const outputSection = document.getElementById('outputSection');
  
    // Example data
    const data = {
      script: codeEditor.value,
      language: document.querySelector('.language-icons .selected').dataset.lang, // Get selected language
      versionIndex: "0", // This should match the language version you want to use
      compileOnly: false // Set to false to execute the code
    };
  
    fetch('/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      outputSection.textContent = data.output || 'Error in execution'; // Display output or error
    })
    .catch(error => {
      console.error('Error:', error);
      outputSection.textContent = 'Error in execution';
    });
  });
  