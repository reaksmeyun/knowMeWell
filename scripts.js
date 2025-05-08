document.getElementById('quiz-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Initialize counters for each dimension
    let dimensions = {
        'EI': { 'E': 0, 'I': 0 },
        'SN': { 'S': 0, 'N': 0 },
        'TF': { 'T': 0, 'F': 0 },
        'JP': { 'J': 0, 'P': 0 }
    };
    
    // Questions mapping to dimensions:
    // EI: 1, 2, 3, 13
    // SN: 4, 5, 6, 14
    // TF: 7, 8, 9
    // JP: 10, 11, 12, 15
    
    // Count answers for each dimension
    for (let i = 1; i <= 15; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        
        if (!selected) {
            alert('Please answer all questions before submitting.');
            return;
        }
        
        const value = selected.value;
        
        // Map questions to dimensions
        if ([1, 2, 3, 13].includes(i)) {
            dimensions.EI[value]++;
        } else if ([4, 5, 6, 14].includes(i)) {
            dimensions.SN[value]++;
        } else if ([7, 8, 9].includes(i)) {
            dimensions.TF[value]++;
        } else if ([10, 11, 12, 15].includes(i)) {
            dimensions.JP[value]++;
        }
    }
    
    // Determine personality type based on majority
    const type = 
        (dimensions.EI.E > dimensions.EI.I ? 'E' : 'I') +
        (dimensions.SN.S > dimensions.SN.N ? 'S' : 'N') +
        (dimensions.TF.T > dimensions.TF.F ? 'T' : 'F') +
        (dimensions.JP.J > dimensions.JP.P ? 'J' : 'P');
    
    // Display results
    showResult(type);
});
function showResult(type) {
    // Personality data
    const personalities = {
        "ISTJ": {
            name: "ISTJ - The Inspector",
            image: "istj.png",
            strengths: ["Reliable and responsible", "Practical and realistic", "Organized and thorough"],
            weaknesses: ["Can be inflexible", "May resist new ideas", "Can be overly critical"],
            majors: ["Accounting", "Law", "Engineering", "Computer Science"],
            careers: ["Accountant", "Judge", "Military officer", "Police officer"]
        },
        "ISFJ": {
            name: "ISFJ - The Protector",
            image: "isfj.png",
            strengths: ["Supportive and loyal", "Practical and thorough", "Good memory for details"],
            weaknesses: ["Can be overly selfless", "Dislike change", "Avoid conflict"],
            majors: ["Nursing", "Education", "Social Work", "Healthcare"],
            careers: ["Nurse", "Teacher", "Social worker", "Counselor"]
        },
        "INFJ": {
            name: "INFJ - The Advocate",
            image: "infj.png",
            strengths: ["Creative and insightful", "Determined and passionate", "Altruistic"],
            weaknesses: ["Perfectionistic", "Sensitive to criticism", "Can burn out easily"],
            majors: ["Psychology", "Counseling", "Writing", "Theology"],
            careers: ["Psychologist", "Writer", "Counselor", "Human Resources"]
        },
        "INTJ": {
            name: "INTJ - The Architect",
            image: "intj.png",
            strengths: ["Strategic and logical", "Independent and determined", "High standards"],
            weaknesses: ["Can be overly critical", "Dismiss emotions", "Perfectionistic"],
            majors: ["Engineering", "Computer Science", "Physics", "Business"],
            careers: ["Scientist", "Engineer", "CEO", "Architect"]
        },
        "ISTP": {
            name: "ISTP - The Craftsman",
            image: "istp.png",
            strengths: ["Optimistic and energetic", "Creative and practical", "Good in a crisis"],
            weaknesses: ["Can be insensitive", "Get bored easily", "Dislike commitment"],
            majors: ["Mechanical Engineering", "Computer Science", "Criminal Justice", "Athletics"],
            careers: ["Mechanic", "Pilot", "Police officer", "Athlete"]
        },
        "ISFP": {
            name: "ISFP - The Artist",
            image: "isfp.png",
            strengths: ["Charming and sensitive", "Artistic and creative", "Loyal to values"],
            weaknesses: ["Avoid conflict", "Dislike routine", "Can be overly private"],
            majors: ["Art", "Music", "Fashion Design", "Psychology"],
            careers: ["Artist", "Musician", "Designer", "Chef"]
        },
        "INFP": {
            name: "INFP - The Mediator",
            image: "infp.png",
            strengths: ["Empathetic and caring", "Creative and idealistic", "Loyal and devoted"],
            weaknesses: ["Can be overly idealistic", "Take things personally", "Dislike routine"],
            majors: ["English", "Psychology", "Art", "Social Work"],
            careers: ["Writer", "Psychologist", "Artist", "Social Worker"]
        },
        "INTP": {
            name: "INTP - The Thinker",
            image: "intp.png",
            strengths: ["Logical and analytical", "Original and creative", "Open-minded"],
            weaknesses: ["Can be insensitive", "Dislike rules", "Procrastinate"],
            majors: ["Computer Science", "Physics", "Mathematics", "Philosophy"],
            careers: ["Computer Programmer", "Scientist", "Mathematician", "Professor"]
        },
        "ESTP": {
            name: "ESTP - The Persuader",
            image: "estp.png",
            strengths: ["Energetic and action-oriented", "Practical and realistic", "Good in a crisis"],
            weaknesses: ["Can be impulsive", "Dislike routine", "Insensitive"],
            majors: ["Business", "Marketing", "Sports Science", "Criminal Justice"],
            careers: ["Entrepreneur", "Salesperson", "Athlete", "Police Officer"]
        },
        "ESFP": {
            name: "ESFP - The Performer",
            image: "esfp.png",
            strengths: ["Enthusiastic and fun-loving", "Practical and observant", "Good with people"],
            weaknesses: ["Dislike routine", "Can be impulsive", "Avoid conflict"],
            majors: ["Theater", "Hospitality", "Education", "Fashion"],
            careers: ["Actor", "Event Planner", "Teacher", "Fashion Designer"]
        },
        "ENFP": {
            name: "ENFP - The Champion",
            image: "enfp.png",
            strengths: ["Enthusiastic and creative", "Good communicator", "Warm and empathetic"],
            weaknesses: ["Can be disorganized", "Overthink things", "Get stressed easily"],
            majors: ["Psychology", "Communications", "Art", "Education"],
            careers: ["Psychologist", "Journalist", "Actor", "Teacher"]
        },
        "ENTP": {
            name: "ENTP - The Debater",
            image: "entp.png",
            strengths: ["Innovative and creative", "Quick thinker", "Excellent brainstormer"],
            weaknesses: ["Can be argumentative", "Dislike routine", "Insensitive"],
            majors: ["Business", "Law", "Engineering", "Political Science"],
            careers: ["Entrepreneur", "Lawyer", "Engineer", "Politician"]
        },
        "ESTJ": {
            name: "ESTJ - The Director",
            image: "estj.png",
            strengths: ["Organized and practical", "Direct and honest", "Loyal and dependable"],
            weaknesses: ["Can be inflexible", "Insensitive", "Judgmental"],
            majors: ["Business", "Law", "Criminal Justice", "Engineering"],
            careers: ["Manager", "Judge", "Police Officer", "Military Officer"]
        },
        "ESFJ": {
            name: "ESFJ - The Caregiver",
            image: "esfj.png",
            strengths: ["Warm and caring", "Reliable and practical", "Good at organizing"],
            weaknesses: ["Can be overly sensitive", "Dislike change", "Put others first too much"],
            majors: ["Nursing", "Education", "Social Work", "Hospitality"],
            careers: ["Nurse", "Teacher", "Social Worker", "Event Planner"]
        },
        "ENFJ": {
            name: "ENFJ - The Giver",
            image: "enfj.png",
            strengths: ["Charismatic and inspiring", "Empathetic and caring", "Natural leaders"],
            weaknesses: ["Can be overly idealistic", "Too sensitive", "Burn out from helping others"],
            majors: ["Psychology", "Education", "Communications", "Social Work"],
            careers: ["Teacher", "Psychologist", "Human Resources", "Non-profit Director"]
        },
        "ENTJ": {
            name: "ENTJ - The Commander",
            image: "entj.png",
            strengths: ["Strong leaders", "Strategic thinkers", "Efficient and organized"],
            weaknesses: ["Can be domineering", "Impatient", "Stubborn"],
            majors: ["Business", "Law", "Political Science", "Engineering"],
            careers: ["CEO", "Lawyer", "Politician", "Military Officer"]
        }
    };
    
    const result = personalities[type];
    
    if (!result) {
        alert("Could not determine personality type. Please try again.");
        return;
    }
    
    // Display the result
    document.getElementById('personality-name').textContent = result.name;
    document.getElementById('personality-image').src = result.image;
    
    const strengthsList = document.getElementById('strengths');
    strengthsList.innerHTML = '';
    result.strengths.forEach(strength => {
        const li = document.createElement('li');
        li.textContent = strength;
        strengthsList.appendChild(li);
    });
    
    const weaknessesList = document.getElementById('weaknesses');
    weaknessesList.innerHTML = '';
    result.weaknesses.forEach(weakness => {
        const li = document.createElement('li');
        li.textContent = weakness;
        weaknessesList.appendChild(li);
    });
    
    const majorsList = document.getElementById('majors');
    majorsList.innerHTML = '';
    result.majors.forEach(major => {
        const li = document.createElement('li');
        li.textContent = major;
        majorsList.appendChild(li);
    });
    
    const careersList = document.getElementById('careers');
    careersList.innerHTML = '';
    result.careers.forEach(career => {
        const li = document.createElement('li');
        li.textContent = career;
        careersList.appendChild(li);
    });
    
    // Show the result section
    document.getElementById('result').style.display = 'block';
    
    // Scroll to the result
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}