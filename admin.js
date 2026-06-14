const API_URL = 'http://localhost:3000/expenses';
const adminTableContentBody = document.getElementById('adminTableContentBody');
const hostelUpdateForm = document.getElementById('hostelUpdateForm');

// Initialize Bootstrap Modal Objects standard controls via scripts
const hostelUpdateModalEl = document.getElementById('hostelUpdateModal');
const bsUpdateModalInstance = new bootstrap.Modal(hostelUpdateModalEl);

document.addEventListener('DOMContentLoaded', pipelineAdminDashboardLoad);
hostelUpdateForm.addEventListener('submit', dispatchPutMutationSequence);

/**
 * Core orchestration method gathering tracking array schemas from mock storage
 */
async function pipelineAdminDashboardLoad() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Internal audit stream driver linkage error mapping database objects.");
        
        const databasePayload = await response.json();
        
        calculateAdminLedgerMetrics(databasePayload);
        buildAdministrationGridRows(databasePayload);
    } catch (err) {
        console.error(err);
        adminTableContentBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger fw-bold py-4">Administrative data pipeline synchronization failure.</td></tr>`;
    }
}

/**
 * Math computation pipeline calculating data aggregations
 */
function calculateAdminLedgerMetrics(datasetArray) {
    const totalRecordsLogged = datasetArray.length;
    const aggregateCapitalAccumulated = datasetArray.reduce((acc, obj) => acc + parseFloat(obj.amount || 0), 0);
    const calculatedMeanCostRatio = totalRecordsLogged > 0 ? (aggregateCapitalAccumulated / totalRecordsLogged) : 0;

    document.getElementById('metricLogsCount').textContent = totalRecordsLogged;
    document.getElementById('metricTotalSpent').textContent = `PKR ${aggregateCapitalAccumulated.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    document.getElementById('metricMeanRatio').textContent = `PKR ${calculatedMeanCostRatio.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

/**
 * Loops and maps data sets directly into management table matrices
 */
function buildAdministrationGridRows(datasetArray) {
    adminTableContentBody.innerHTML = '';
    
    if (datasetArray.length === 0) {
        adminTableContentBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4 fw-medium">Database ledger statement contains zero logs.</td></tr>`;
        return;
    }

    datasetArray.forEach(record => {
        const matrixRowNode = document.createElement('tr');
        matrixRowNode.innerHTML = `
            <td class="fw-bold text-dark">${record.title}</td>
            <td><span class="badge bg-success px-2.5 py-1.5">${record.category}</span></td>
            <td class="text-secondary small fw-medium">${record.date}</td>
            <td class="text-secondary">${record.paymentMethod}</td>
            <td class="fw-bold text-success">PKR ${Number(record.amount).toLocaleString()}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-success text-white fw-semibold me-1 px-2.5" onclick="initializeUpdatePreloadFlow('${record.id}')">Edit</button>
                <button class="btn btn-sm btn-outline-danger fw-semibold px-2.5" onclick="executeDeleteRecordTransaction('${record.id}')">Delete</button>
            </td>
        `;
        adminTableContentBody.appendChild(matrixRowNode);
    });
}

/**
 * Captures targeted item definitions to seed state management update models
 */
async function initializeUpdatePreloadFlow(targetID) {
    try {
        const response = await fetch(`${API_URL}/${targetID}`);
        if (!response.ok) throw new Error("Targeted object lookup verification failure.");
        
        const entityModel = await response.json();

        document.getElementById('editRecordID').value = entityModel.id;
        document.getElementById('editTitle').value = entityModel.title;
        document.getElementById('editAmount').value = entityModel.amount;
        document.getElementById('editCategory').value = entityModel.category;
        document.getElementById('editDate').value = entityModel.date;
        
        if (entityModel.paymentMethod === 'Cash') {
            document.getElementById('editPayCash').checked = true;
        } else {
            document.getElementById('editPayEasyPaisa').checked = true;
        }

        bsUpdateModalInstance.show();
    } catch (err) {
        alert("Failed to pre-load the targeted ledger record configuration schema variables.");
    }
}

/**
 * Handles sending your clean PUT request payloads to completely overwrite objects
 */
async function dispatchPutMutationSequence(e) {
    e.preventDefault();
    const targetID = document.getElementById('editRecordID').value;
    
    const operationalModelPayload = {
        title: document.getElementById('editTitle').value.trim(),
        amount: parseFloat(document.getElementById('editAmount').value),
        category: document.getElementById('editCategory').value,
        date: document.getElementById('editDate').value,
        paymentMethod: document.querySelector('input[name="editPaymentMethod"]:checked').value
    };

    try {
        const response = await fetch(`${API_URL}/${targetID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(operationalModelPayload)
        });

        if (!response.ok) throw new Error("PUT alteration sequence rejected by storage controller.");
        
        bsUpdateModalInstance.hide();
        pipelineAdminDashboardLoad(); // Refresh dashboard data states natively
    } catch (err) {
        alert("Failed to save changes down to local mock system storage layers.");
    }
}

/**
 * Triggers clean DELETE request mutations using protection confirmation boxes
 */
async function executeDeleteRecordTransaction(targetID) {
    // Protective verification dialog box matching architecture requirements
    if (!confirm("Are you completely certain you want to permanently delete this shared hostel record entry?")) return;

    try {
        const response = await fetch(`${API_URL}/${targetID}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("Destruction transaction intercepted a system exception fault.");
        
        pipelineAdminDashboardLoad();
    } catch (err) {
        alert("CRITICAL ERROR: Unable to process data block deletion request checks.");
    }
}