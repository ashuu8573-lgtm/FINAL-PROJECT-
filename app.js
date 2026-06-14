const API_URL = 'http://localhost:3000/expenses';

// Document Element DOM Registry Selectors
const hostelForm = document.getElementById('hostelForm');
const ledgerContainer = document.getElementById('ledgerContainer');
const filterCategory = document.getElementById('filterCategory');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorBanner = document.getElementById('errorBanner');

// Execution Listeners Mappings
document.addEventListener('DOMContentLoaded', () => loadHostelLedgerData());
filterCategory.addEventListener('change', () => loadHostelLedgerData(filterCategory.value));
hostelForm.addEventListener('submit', dispatchFormSubmitTransaction);

/**
 * Executes Asynchronous GET sequences to fetch mock network objects
 */
async function loadHostelLedgerData(filterTarget = 'All') {
    try {
        toggleLoaderState(true);
        clearLayoutErrorState();
        
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Data Stream Fault Instance Code: ${response.status}`);
        }
        
        let collectiveData = await response.json();
        
        // Dynamic Filter Evaluation Sequence Check
        if (filterTarget !== 'All') {
            collectiveData = collectiveData.filter(record => record.category === filterTarget);
        }
        
        buildDashboardUILayoutGrid(collectiveData);
    } catch (err) {
        renderLayoutErrorState("Unable to load shared hostel database entries. Verify your JSON-Server local node status.");
    } finally {
        toggleLoaderState(false);
    }
}

/**
 * Handles mapping loop arrays directly into layout blocks dynamically
 */
function buildDashboardUILayoutGrid(itemsList) {
    ledgerContainer.innerHTML = '';
    
    if (itemsList.length === 0) {
        ledgerContainer.innerHTML = `
            <div class="col-12 text-center text-muted py-5">
                <p class="m-0 bg-white rounded p-4 border border-dashed">No shared hostel utility or mess entries match your filter.</p>
            </div>`;
        return;
    }
    
    itemsList.forEach(item => {
        const structuralCard = document.createElement('div');
        structuralCard.className = 'col-12';
        structuralCard.innerHTML = `
            <div class="card hostel-card shadow-sm border-0 border-start border-success border-4 rounded-3 bg-white">
                <div class="card-body d-flex justify-content-between align-items-center py-3">
                    <div>
                        <h6 class="fw-bold m-0 text-dark">${item.title}</h6>
                        <small class="text-muted d-block mt-1">${item.date} • <span class="badge bg-light text-success border">${item.category}</span></small>
                    </div>
                    <div class="text-end">
                        <span class="fs-5 fw-bold text-success">PKR ${Number(item.amount).toLocaleString()}</span>
                        <div class="text-secondary small fw-medium mt-1">🔹 via ${item.paymentMethod}</div>
                    </div>
                </div>
            </div>`;
        ledgerContainer.appendChild(structuralCard);
    });
}

/**
 * Intercepts submission behaviors to manage automated POST payload sequences safely
 */
async function dispatchFormSubmitTransaction(e) {
    e.preventDefault();
    if (!executeFormValidationChecks()) return; // Abort submission flow if rules fail

    const ledgerPayload = {
        title: document.getElementById('title').value.trim(),
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ledgerPayload)
        });

        if (!response.ok) throw new Error("POST request rejected by storage driver.");

        hostelForm.reset();
        loadHostelLedgerData(filterCategory.value); // Re-trigger live content update sequence
    } catch (err) {
        renderLayoutErrorState("Failed to commit your new hostel expense record schema to local database storage.");
    }
}

/**
 * Custom inline input field validation subroutine 
 */
function executeFormValidationChecks() {
    let internalPassState = true;
    const trackingIDs = ['title', 'amount', 'category', 'date'];
    
    // Clear old errors before evaluating field changes
    trackingIDs.forEach(fieldID => document.getElementById(`${fieldID}Error`).textContent = '');

    const valTitle = document.getElementById('title').value.trim();
    const valAmount = document.getElementById('amount').value;
    const valCategory = document.getElementById('category').value;
    const valDate = document.getElementById('date').value;

    if (!valTitle) {
        document.getElementById('titleError').textContent = "Provide a valid tracking bill title context definition description.";
        internalPassState = false;
    }
    if (!valAmount || parseFloat(valAmount) <= 0) {
        document.getElementById('amountError').textContent = "Hostel shared asset costs must track greater than zero.";
        internalPassState = false;
    }
    if (!valCategory) {
        document.getElementById('categoryError').textContent = "Select an applicable system matching structural tracking domain group.";
        internalPassState = false;
    }
    if (!valDate) {
        document.getElementById('dateError').textContent = "Select the explicit calendar execution payment timestamp tracker.";
        internalPassState = false;
    }

    return internalPassState;
}

// Global UI Layout Mutator Helpers
function toggleLoaderState(showLoader) { loadingSpinner.style.display = showLoader ? 'block' : 'none'; }
function renderLayoutErrorState(msgText) { errorBanner.textContent = msgText; errorBanner.classList.remove('d-none'); }
function clearLayoutErrorState() { errorBanner.classList.add('d-none'); }