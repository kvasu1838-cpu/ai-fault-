const rules = [

    {
        id: "R01",
        conditions: ["no_power", "no_led"],
        result: "Power Supply Failure",
        explanation:
            "The computer does not start and the power LED is off."
    },

    {
        id: "R02",
        conditions: ["overheat", "fan"],
        result: "Cooling System Failure",
        explanation:
            "The system is overheating and the cooling fan is not working."
    },

    {
        id: "R03",
        conditions: ["overheat", "shutdown"],
        result: "CPU Overheating",
        explanation:
            "Overheating combined with automatic shutdown indicates a possible CPU temperature problem."
    },

    {
        id: "R04",
        conditions: ["noise", "disk"],
        result: "Hard Disk Failure",
        explanation:
            "A strange noise combined with disk errors may indicate a hard disk problem."
    },

    {
        id: "R05",
        conditions: ["blue", "restart"],
        result: "Memory or Driver Problem",
        explanation:
            "Blue-screen errors combined with repeated restarts may indicate a memory or driver problem."
    },

    {
        id: "R06",
        conditions: ["slow", "disk"],
        result: "Storage Problem",
        explanation:
            "Poor performance together with disk errors may indicate a storage problem."
    },

    {
        id: "R07",
        conditions: ["no_power", "display"],
        result: "Power or Display Failure",
        explanation:
            "Power symptoms together with no display may indicate a power or display problem."
    },

    {
        id: "R08",
        conditions: ["network"],
        result: "Network Configuration Problem",
        explanation:
            "The network is unavailable."
    }

];


function getFacts() {

    const selected =
        document.querySelectorAll(
            'input[type="checkbox"]:checked'
        );

    return Array.from(selected)
        .map(item => item.value);

}


/* ========================================
   FORWARD CHAINING
======================================== */

function forwardDiagnosis() {

    const facts = getFacts();

    const result =
        document.getElementById("result");


    if (facts.length === 0) {

        result.innerHTML = `
            <div class="no-result">
                <h2>No Symptoms Selected</h2>
                <p>Please select at least one symptom.</p>
            </div>
        `;

        return;
    }


    let matches = [];


    for (const rule of rules) {

        const matched =
            rule.conditions.every(
                condition =>
                    facts.includes(condition)
            );


        if (matched) {

            matches.push(rule);

        }

    }


    if (matches.length === 0) {

        result.innerHTML = `
            <div class="no-result">
                <h2>No Matching Fault</h2>

                <p>
                    No rule in the knowledge base matches
                    the selected symptoms.
                </p>
            </div>
        `;

        return;
    }


    let html = `
        <div class="result-card">

            <h2>
                Forward Chaining Result
            </h2>

            <p>
                The system started with the selected facts
                and applied matching rules.
            </p>
    `;


    matches.forEach(rule => {

        html += `

            <div class="result-item">

                <h3>
                    ${rule.result}
                </h3>

                <p>
                    ${rule.explanation}
                </p>

                <br>

                <strong>
                    ${rule.id}:
                </strong>

                IF
                ${rule.conditions.join(" AND ")}

                THEN
                ${rule.result}

            </div>

        `;

    });


    html += `</div>`;

    result.innerHTML = html;

}


/* ========================================
   BACKWARD CHAINING
======================================== */

function backwardDiagnosis() {

    const facts = getFacts();

    const result =
        document.getElementById("result");


    if (facts.length === 0) {

        result.innerHTML = `
            <div class="no-result">

                <h2>No Symptoms Selected</h2>

                <p>
                    Select symptoms before starting
                    backward chaining.
                </p>

            </div>
        `;

        return;
    }


    let goals = [];


    /*
       Each rule conclusion is treated as a goal.
       The system works backward and checks whether
       all conditions of that rule are present.
    */

    for (const rule of rules) {

        const goalCanBeProved =
            rule.conditions.every(
                condition =>
                    facts.includes(condition)
            );


        if (goalCanBeProved) {

            goals.push(rule);

        }

    }


    if (goals.length === 0) {

        result.innerHTML = `
            <div class="no-result">

                <h2>
                    No Goal Could Be Proven
                </h2>

                <p>
                    The selected symptoms do not currently
                    prove any diagnosis in the knowledge base.
                </p>

            </div>
        `;

        return;
    }


    let html = `
        <div class="result-card">

            <h2>
                Backward Chaining Result
            </h2>

            <p>
                The system selected possible faults as goals
                and worked backward to check their conditions.
            </p>
    `;


    goals.forEach(rule => {

        html += `

            <div class="result-item">

                <h3>
                    Goal: ${rule.result}
                </h3>

                <p>
                    Required conditions were found:
                </p>

                <p>
                    ${rule.conditions.join(" AND ")}
                </p>

                <p>
                    <strong>
                        Goal Proven ✓
                    </strong>
                </p>

                <br>

                <p>
                    ${rule.explanation}
                </p>

            </div>

        `;

    });


    html += `</div>`;

    result.innerHTML = html;

}


/* ========================================
   CLEAR
======================================== */

function clearDiagnosis() {

    const checkboxes =
        document.querySelectorAll(
            'input[type="checkbox"]'
        );


    checkboxes.forEach(
        checkbox => {
            checkbox.checked = false;
        }
    );


    document.getElementById("result").innerHTML = "";

}
