document.body.classList.add("loading");

const districtData = {
    coimbatore: {
        eyebrow: "Primary cluster",
        title: "Coimbatore restoration belt",
        copy: "Lake restoration, recharge wells, and waste diversion initiatives are helping reconnect urban growth with ecological repair.",
        projects: "12",
        focus: "Water",
        reach: "2,800"
    },
    tiruppur: {
        eyebrow: "Expansion zone",
        title: "Tiruppur river edge work",
        copy: "Pollution source control and neighborhood cleanups are focused on protecting canals and river-linked settlements from waste inflow.",
        projects: "8",
        focus: "River",
        reach: "1,900"
    },
    erode: {
        eyebrow: "Landscape recovery",
        title: "Erode recharge and planting arc",
        copy: "Recharge structures and native planting are being paired to strengthen soil moisture retention in stressed peri-urban zones.",
        projects: "6",
        focus: "Forestry",
        reach: "1,250"
    },
    nilgiris: {
        eyebrow: "Ecology buffer",
        title: "Nilgiris habitat support zone",
        copy: "Forest-edge awareness, biodiversity support, and wildlife-safe restoration methods are guiding work near sensitive terrain.",
        projects: "4",
        focus: "Wildlife",
        reach: "900"
    }
};

const marqueeItems = [
    "water recharge",
    "native forestry",
    "river restoration",
    "wildlife safety",
    "community action",
    "tamil nadu",
    "lake revival",
    "climate resilience"
];

const tickerItems = [
    "2,800 families now have cleaner water access",
    "Aaniver highlighted for lake and pond restoration",
    "18,500 indigenous saplings planted this season",
    "Volunteer-driven cleanup work keeps growing",
    "River health monitoring is shaping new projects"
];

function setupLoader() {
    const loader = document.getElementById("loader");
    const fill = document.getElementById("loader-fill");
    const progressBar = document.getElementById("loader-progress");
    const mainRoot = document.getElementById("mainRoot");
    const branch1 = document.getElementById("branch1");
    const branch2 = document.getElementById("branch2");
    const duration = 1800;
    const start = performance.now();

    function animateProgress(now) {
        const progress = Math.min((now - start) / duration, 1);
        const percent = Math.round(progress * 100);

        if (fill) {
            fill.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        }

        if (progressBar) {
            progressBar.style.width = `${percent}%`;
        }

        if (mainRoot) {
            mainRoot.style.strokeDashoffset = String(200 - (progress * 200));
        }

        if (branch1) {
            const branchProgress = Math.max(0, Math.min((progress - 0.5) / 0.5, 1));
            branch1.style.strokeDashoffset = String(60 - (branchProgress * 60));
        }

        if (branch2) {
            const branchProgress = Math.max(0, Math.min((progress - 0.7) / 0.3, 1));
            branch2.style.strokeDashoffset = String(60 - (branchProgress * 60));
        }

        if (progress < 1) {
            requestAnimationFrame(animateProgress);
            return;
        }

        window.setTimeout(() => {
            if (loader) {
                loader.classList.add("is-hidden");
            }
            document.body.classList.remove("loading");
        }, 180);
    }

    requestAnimationFrame(animateProgress);
}

function setupCursor() {
    if (!window.matchMedia("(pointer: fine)").matches) {
        return;
    }

    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursor-ring");
    if (!cursor || !ring) {
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursor.style.opacity = "1";
        ring.style.opacity = "1";
    });

    const interactiveSelector = "a, button, input, textarea, .project-card, .district-pin";
    document.querySelectorAll(interactiveSelector).forEach((element) => {
        element.addEventListener("mouseenter", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1.6)";
            ring.style.transform = "translate(-50%, -50%) scale(1.35)";
        });

        element.addEventListener("mouseleave", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
            ring.style.transform = "translate(-50%, -50%) scale(1)";
        });
    });

    function frame() {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function setupNavigation() {
    const nav = document.getElementById("main-nav");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
    const scrollLinks = document.querySelectorAll("[data-scroll]");

    function syncNavState() {
        if (!nav) {
            return;
        }
        nav.classList.toggle("scrolled", window.scrollY > 40);
    }

    syncNavState();
    window.addEventListener("scroll", syncNavState, { passive: true });

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            const isOpen = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!isOpen));
            navLinks.classList.toggle("is-open", !isOpen);
        });
    }

    scrollLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || !href.startsWith("#")) {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });

            if (navToggle && navLinks) {
                navToggle.setAttribute("aria-expanded", "false");
                navLinks.classList.remove("is-open");
            }
        });
    });
}

function setupReveal() {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((element) => observer.observe(element));
}

function setupMarquee() {
    const marquee = document.getElementById("marquee-inner");
    if (!marquee) {
        return;
    }

    const repeated = [...marqueeItems, ...marqueeItems];
    marquee.innerHTML = repeated.map((item) => `<span class="marquee-item">${item}</span>`).join("");
}

function setupTicker() {
    const tickerA = document.getElementById("ticker-a");
    const tickerB = document.getElementById("ticker-b");
    const content = [...tickerItems, ...tickerItems]
        .map((item, index) => {
            const separator = index === tickerItems.length * 2 - 1 ? "" : '<span class="ticker-sep">/</span>';
            return `<span class="ticker-item">${item}</span>${separator}`;
        })
        .join("");

    if (tickerA) {
        tickerA.innerHTML = content;
    }

    if (tickerB) {
        tickerB.innerHTML = content;
    }
}

function setupDistricts() {
    const pins = document.querySelectorAll(".district-pin");
    const eyebrow = document.getElementById("district-eyebrow");
    const title = document.getElementById("district-title");
    const copy = document.getElementById("district-copy");
    const projects = document.getElementById("district-projects");
    const focus = document.getElementById("district-focus");
    const reach = document.getElementById("district-reach");

    function activateDistrict(key) {
        const data = districtData[key];
        if (!data) {
            return;
        }

        if (eyebrow) eyebrow.textContent = data.eyebrow;
        if (title) title.textContent = data.title;
        if (copy) copy.textContent = data.copy;
        if (projects) projects.textContent = data.projects;
        if (focus) focus.textContent = data.focus;
        if (reach) reach.textContent = data.reach;

        pins.forEach((pin) => {
            pin.classList.toggle("active", pin.dataset.district === key);
        });
    }

    pins.forEach((pin) => {
        const handler = () => activateDistrict(pin.dataset.district);
        pin.addEventListener("click", handler);
        pin.addEventListener("mouseenter", handler);
        pin.addEventListener("focus", handler);
    });
}

function setupMissionGallery() {
    const rail = document.getElementById("mission-rail");
    const cards = Array.from(document.querySelectorAll("[data-mission-card]"));
    const filterButtons = Array.from(document.querySelectorAll(".mission-tab"));
    const navButtons = Array.from(document.querySelectorAll("[data-mission-nav]"));
    const modal = document.getElementById("mission-modal");
    const modalImage = document.getElementById("mission-modal-image");
    const modalBadge = document.getElementById("mission-modal-badge");
    const modalTitle = document.getElementById("mission-modal-title");
    const modalDescription = document.getElementById("mission-modal-description");
    const closeControls = document.querySelectorAll("[data-mission-close]");
    const modalCloseButton = document.querySelector(".mission-modal-close");

    if (!rail || !cards.length || !modal || !modalImage || !modalBadge || !modalTitle || !modalDescription) {
        return;
    }

    let activeCard = cards[0];
    let activeFilter = "all";
    let rafId = 0;
    let lastTrigger = null;

    function setActiveCard(nextCard) {
        if (!nextCard) {
            return;
        }

        activeCard = nextCard;
        cards.forEach((card) => {
            card.classList.toggle("is-active", card === nextCard);
        });
    }

    function centerCard(card, behavior = "smooth") {
        if (!card) {
            return;
        }

        const left = card.offsetLeft - ((rail.clientWidth - card.offsetWidth) / 2);
        rail.scrollTo({
            left: Math.max(left, 0),
            behavior
        });
    }

    function syncActiveCard() {
        const railRect = rail.getBoundingClientRect();
        const center = railRect.left + (railRect.width / 2);
        let nextCard = activeCard;
        let bestDelta = Number.POSITIVE_INFINITY;

        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const delta = Math.abs((rect.left + (rect.width / 2)) - center);
            if (delta < bestDelta) {
                bestDelta = delta;
                nextCard = card;
            }
        });

        setActiveCard(nextCard);
        rafId = 0;
    }

    function requestSync() {
        if (rafId) {
            return;
        }

        rafId = window.requestAnimationFrame(syncActiveCard);
    }

    function applyFilter(filter) {
        activeFilter = filter;

        filterButtons.forEach((button) => {
            const matches = (button.dataset.storyFilter || "all") === filter;
            button.classList.toggle("is-active", matches);
        });

        cards.forEach((card) => {
            const muted = filter !== "all" && card.dataset.storyType !== filter;
            card.classList.toggle("is-filter-muted", muted);
        });
    }

    function goToCard(card, behavior = "smooth") {
        if (!card) {
            return;
        }

        setActiveCard(card);
        centerCard(card, behavior);
    }

    function stepCard(direction) {
        const currentIndex = cards.indexOf(activeCard);
        const nextIndex = Math.max(0, Math.min(cards.length - 1, currentIndex + direction));
        const nextCard = cards[nextIndex];

        if (!nextCard || nextCard === activeCard) {
            return;
        }

        goToCard(nextCard);
        nextCard.focus({ preventScroll: true });
    }

    function openModal(card) {
        lastTrigger = card;
        modalBadge.textContent = card.dataset.badge || "";
        modalTitle.textContent = card.dataset.title || "";
        modalDescription.textContent = card.dataset.description || "";
        modalImage.src = card.dataset.image || "";
        modalImage.alt = `${card.dataset.title || "Mission"} - ${card.dataset.badge || "Aaniver"}`;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        if (modalCloseButton) {
            modalCloseButton.focus();
        }
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        modalImage.src = "";
        modalImage.alt = "";
        if (lastTrigger) {
            lastTrigger.focus();
        }
    }

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (card !== activeCard) {
                goToCard(card);
                return;
            }

            openModal(card);
        });

        card.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                event.preventDefault();
                stepCard(1);
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                stepCard(-1);
            }
        });
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.storyFilter || "all";
            applyFilter(filter);

            if (filter === "all") {
                goToCard(activeCard);
                return;
            }

            const firstMatch = cards.find((card) => card.dataset.storyType === filter) || cards[0];
            goToCard(firstMatch);
        });
    });

    navButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const direction = button.dataset.missionNav === "next" ? 1 : -1;
            stepCard(direction);
        });
    });

    closeControls.forEach((control) => {
        control.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });

    rail.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", () => {
        centerCard(activeCard, "auto");
        requestSync();
    });

    applyFilter(activeFilter);
    window.requestAnimationFrame(() => {
        goToCard(cards[0], "auto");
        requestSync();
    });
}

function setupFilters() {
    const buttons = document.querySelectorAll(".tab-btn");
    const cards = document.querySelectorAll(".clipping-card");
    const featuredStory = document.getElementById("feat-clipping");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const category = button.dataset.filter || "all";

            buttons.forEach((item) => item.classList.toggle("active", item === button));
            cards.forEach((card) => {
                const matches = category === "all" || card.dataset.category === category;
                card.classList.toggle("is-hidden", !matches);
            });

            if (featuredStory) {
                const matches = category === "all" || featuredStory.dataset.category === category;
                featuredStory.classList.toggle("is-hidden", !matches);
            }
        });
    });
}

function setupCounters() {
    const counters = document.querySelectorAll("[data-target]");
    if (!counters.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const counter = entry.target;
                const target = Number(counter.dataset.target || 0);
                const duration = 1600;
                const start = performance.now();

                function tick(now) {
                    const progress = Math.min((now - start) / duration, 1);
                    const value = Math.round(target * progress);
                    counter.textContent = target >= 1000 ? value.toLocaleString("en-IN") : String(value);
                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    }
                }

                requestAnimationFrame(tick);
                observer.unobserve(counter);
            });
        },
        { threshold: 0.4 }
    );

    counters.forEach((counter) => observer.observe(counter));
}

function setupContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    if (!form || !status) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("userName");
        const email = document.getElementById("userEmail");
        const message = document.getElementById("userMessage");

        if (!name || !email || !message || !name.value.trim() || !email.value.trim() || !message.value.trim()) {
            status.textContent = "Please complete all fields before sending your message.";
            status.dataset.state = "error";
            return;
        }

        const whatsappMessage = [
            "Hello Aaniver Team,",
            "",
            "New website inquiry:",
            `Name: ${name.value.trim()}`,
            `Email: ${email.value.trim()}`,
            `Message: ${message.value.trim()}`
        ].join("\n");

        const url = `https://wa.me/917200552119?text=${encodeURIComponent(whatsappMessage)}`;
        const popup = window.open(url, "_blank", "noopener");

        if (!popup) {
            window.location.href = url;
        }

        status.textContent = "WhatsApp is opening in a new tab with your message prefilled.";
        status.dataset.state = "success";
        form.reset();
    });
}

function setupYear() {
    const year = document.getElementById("current-year");
    if (year) {
        year.textContent = String(new Date().getFullYear());
    }
}

function setupDonationSystem() {
    const freqBtns = document.querySelectorAll(".freq-btn");
    const amountChips = document.querySelectorAll(".amount-chip");
    const customInput = document.getElementById("customAmountInput");
    const impactDescription = document.getElementById("impact-description");
    const triggerCheckout = document.getElementById("trigger-checkout");
    const donorNameInput = document.getElementById("donorName");
    const donorEmailInput = document.getElementById("donorEmail");

    const modal = document.getElementById("donate-modal");
    const closeBg = document.getElementById("close-donate-modal-bg");
    const closeBtn = document.getElementById("close-donate-modal-btn");
    const paymentStep = document.getElementById("modal-payment-step");
    const successStep = document.getElementById("modal-success-step");

    const summaryFrequency = document.getElementById("summary-frequency");
    const summaryAmount = document.getElementById("summary-amount");

    const payMethodBtns = document.querySelectorAll(".pay-method-btn");
    const methodFlows = document.querySelectorAll(".method-flow");
    const btnSubmitPayment = document.getElementById("btn-submit-payment");
    const btnVerifyUpi = document.getElementById("btn-verify-upi");
    const upiIdInput = document.getElementById("upiIdInput");

    // Success elements
    const successStatement = document.getElementById("success-statement");
    const receiptName = document.getElementById("receipt-donor-name");
    const receiptEmail = document.getElementById("receipt-donor-email");
    const receiptRef = document.getElementById("receipt-ref-id");
    const receiptAmount = document.getElementById("receipt-amount");
    const receiptDate = document.getElementById("receipt-date");
    const btnDownloadReceipt = document.getElementById("btn-download-receipt");

    const shareWa = document.getElementById("share-wa");
    const shareLi = document.getElementById("share-li");
    const shareFb = document.getElementById("share-fb");

    if (!triggerCheckout) return;

    let selectedFrequency = "one-time";
    let selectedAmount = 500;

    // Helper to calculate impact statement
    function calculateImpact(amount, frequency) {
        const amt = Number(amount) || 0;
        const freqLabel = frequency === "monthly" ? " every month" : "";
        
        if (amt < 10) {
            return `Supports essential environmental restoration efforts.`;
        } else if (amt < 100) {
            return `Supports seed collection and nursery bed preparation${freqLabel}.`;
        }
        
        const saplings = Math.floor(amt / 100);
        if (amt >= 100 && amt < 500) {
            return `Supports planting and protecting ${saplings} native sapling${saplings > 1 ? "s" : ""}${freqLabel}.`;
        } else if (amt >= 500 && amt < 1000) {
            return `Supports ${saplings} saplings and local waterbody desilting / cleanups${freqLabel}.`;
        } else if (amt >= 1000 && amt < 5000) {
            return `Supports ${saplings} saplings and student-led environmental awareness campaigns${freqLabel}.`;
        } else {
            return `Supports ${saplings} saplings, watershed mapping, and large-scale habitat restoration${freqLabel}.`;
        }
    }

    function updateImpactDisplay() {
        impactDescription.textContent = calculateImpact(selectedAmount, selectedFrequency);
    }

    // Frequency switcher
    freqBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            freqBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            selectedFrequency = btn.dataset.freq;
            updateImpactDisplay();
        });
    });

    // Preset amount chips
    amountChips.forEach(chip => {
        chip.addEventListener("click", () => {
            amountChips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            if (customInput) customInput.value = "";
            selectedAmount = Number(chip.dataset.amount);
            updateImpactDisplay();
        });
    });

    // Custom amount input
    if (customInput) {
        customInput.addEventListener("input", () => {
            amountChips.forEach(c => c.classList.remove("active"));
            const val = Number(customInput.value);
            if (val > 0) {
                selectedAmount = val;
            } else {
                selectedAmount = 0;
            }
            updateImpactDisplay();
        });
    }

    // Modal open
    triggerCheckout.addEventListener("click", () => {
        const name = donorNameInput.value.trim();
        const email = donorEmailInput.value.trim();

        if (!name || !email) {
            alert("Please fill in your name and email to proceed securely.");
            return;
        }

        // Populate summary
        if (summaryFrequency) {
            summaryFrequency.textContent = selectedFrequency === "monthly" ? "Monthly" : "One-time";
        }
        if (summaryAmount) {
            summaryAmount.textContent = `₹${selectedAmount.toLocaleString("en-IN")}`;
        }

        // Show payment step, hide success
        paymentStep.classList.remove("hidden");
        successStep.classList.add("hidden");

        // Open modal
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
    });

    // Modal close
    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    if (closeBg) closeBg.addEventListener("click", closeModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Payment method selector
    payMethodBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            payMethodBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const method = btn.dataset.method;
            methodFlows.forEach(flow => {
                flow.classList.toggle("active", flow.id === `flow-${method}`);
            });
        });
    });

    // Verify UPI UPI mock
    if (btnVerifyUpi) {
        btnVerifyUpi.addEventListener("click", () => {
            const upiId = upiIdInput.value.trim();
            if (!upiId || !upiId.includes("@")) {
                alert("Please enter a valid UPI ID (e.g. name@okhdfc)");
                return;
            }
            btnVerifyUpi.textContent = "Verified ✓";
            btnVerifyUpi.style.backgroundColor = "rgba(58, 108, 77, 0.1)";
            btnVerifyUpi.style.color = "var(--forest-700)";
            btnVerifyUpi.disabled = true;
        });
    }

    // Submit Simulated Payment
    if (btnSubmitPayment) {
        btnSubmitPayment.addEventListener("click", () => {
            // Verify fields based on active flow
            const activeMethod = document.querySelector(".pay-method-btn.active").dataset.method;
            if (activeMethod === "upi") {
                const upiVal = upiIdInput.value.trim();
                if (!upiVal) {
                    alert("Please enter your UPI ID to proceed.");
                    return;
                }
            } else if (activeMethod === "card") {
                const cardNo = document.getElementById("cardNumber").value.trim();
                const expiry = document.getElementById("cardExpiry").value.trim();
                const cvv = document.getElementById("cardCvv").value.trim();
                if (!cardNo || !expiry || !cvv) {
                    alert("Please fill in card details to checkout.");
                    return;
                }
            }

            btnSubmitPayment.textContent = "Processing payment...";
            btnSubmitPayment.disabled = true;

            setTimeout(() => {
                // Payment Completed
                paymentStep.classList.add("hidden");
                successStep.classList.remove("hidden");
                btnSubmitPayment.textContent = "Pay Securely";
                btnSubmitPayment.disabled = false;

                // Reset UPI verify button
                if (btnVerifyUpi) {
                    btnVerifyUpi.textContent = "Verify";
                    btnVerifyUpi.style.backgroundColor = "";
                    btnVerifyUpi.style.color = "";
                    btnVerifyUpi.disabled = false;
                }

                // Generate transaction receipt details
                const name = donorNameInput.value.trim();
                const email = donorEmailInput.value.trim();
                const txnId = "TXN" + Math.floor(100000000 + Math.random() * 900000000);
                const today = new Date().toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                });

                if (receiptName) receiptName.textContent = name;
                if (receiptEmail) receiptEmail.textContent = email;
                if (receiptRef) receiptRef.textContent = txnId;
                if (receiptAmount) receiptAmount.textContent = `₹${selectedAmount.toLocaleString("en-IN")}`;
                if (receiptDate) receiptDate.textContent = today;

                const saplings = Math.floor(selectedAmount / 100);
                let successMsg = `Your ${selectedFrequency === "monthly" ? "monthly " : ""}donation of ₹${selectedAmount.toLocaleString("en-IN")} will help `;
                if (selectedAmount < 100) {
                    successMsg += "support seed collections and nurseries.";
                } else if (selectedAmount < 500) {
                    successMsg += `plant and nurture ${saplings} native saplings.`;
                } else if (selectedAmount < 1000) {
                    successMsg += `nurture ${saplings} saplings and fund waterbody cleanups.`;
                } else {
                    successMsg += `plant ${saplings} saplings and support local awareness drives.`;
                }
                if (successStatement) successStatement.textContent = successMsg;

                // Configure social share buttons
                const shareText = encodeURIComponent(`I just donated ₹${selectedAmount.toLocaleString("en-IN")} to Aaniver Environmental Foundation to support ecological restoration in Tamil Nadu! Join me in restoring our roots 🌳💧`);
                const shareUrl = encodeURIComponent("https://aaniver.org");

                if (shareWa) shareWa.href = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`;
                if (shareLi) shareLi.href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&text=${shareText}`;
                if (shareFb) shareFb.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

                // Setup dynamic receipt download
                if (btnDownloadReceipt) {
                    const newBtn = btnDownloadReceipt.cloneNode(true);
                    btnDownloadReceipt.parentNode.replaceChild(newBtn, btnDownloadReceipt);
                    
                    newBtn.addEventListener("click", () => {
                        const receiptHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Aaniver Foundation - Donation Receipt</title>
    <style>
        body { font-family: sans-serif; color: #142019; background: #f7f4ec; padding: 40px; }
        .receipt { max-width: 600px; margin: 0 auto; background: white; border: 1px solid #ddd; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
        .header { text-align: center; border-bottom: 2px solid #3a6c4d; padding-bottom: 20px; margin-bottom: 20px; }
        .header h2 { margin: 0; color: #102318; font-size: 24px; letter-spacing: 1px; }
        .header p { margin: 5px 0 0; font-size: 12px; color: #627167; text-transform: uppercase; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .row span { color: #627167; }
        .row strong { color: #102318; }
        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #627167; line-height: 1.5; }
        .stamp { border: 2px dashed #3a6c4d; color: #3a6c4d; display: inline-block; padding: 10px 20px; font-weight: bold; border-radius: 4px; transform: rotate(-3deg); margin-top: 15px; }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="header">
            <h2>AANIVER ENVIRONMENTAL FOUNDATION</h2>
            <p>Official Donation Receipt</p>
        </div>
        <div class="row"><span>Donor Name</span><strong>${name}</strong></div>
        <div class="row"><span>Email</span><strong>${email}</strong></div>
        <div class="row"><span>Reference ID</span><strong>${txnId}</strong></div>
        <div class="row"><span>Donation Type</span><strong>${selectedFrequency === "monthly" ? "Monthly Subscription" : "One-Time Donation"}</strong></div>
        <div class="row"><span>Amount</span><strong>₹${selectedAmount.toLocaleString("en-IN")}</strong></div>
        <div class="row"><span>Date</span><strong>${today}</strong></div>
        <div class="row"><span>Impact Statement</span><strong>${successMsg}</strong></div>
        
        <div class="footer">
            <div class="stamp">PAID SECURELY</div>
            <p>Thank you for supporting water, forest, and river restoration in Tamil Nadu.<br>Aaniver Environmental Foundation is a registered NGO.</p>
        </div>
    </div>
</body>
</html>`;
                        const blob = new Blob([receiptHtml], { type: "text/html" });
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `aaniver-receipt-${txnId}.html`;
                        link.click();
                    });
                }

            }, 1200);
        });
    }

    // Set initial display
    updateImpactDisplay();
}

document.addEventListener("DOMContentLoaded", () => {
    setupCursor();
    setupNavigation();
    setupReveal();
    setupMarquee();
    setupTicker();
    setupDistricts();
    setupMissionGallery();
    setupFilters();
    setupCounters();
    setupContactForm();
    setupYear();
    setupDonationSystem();
});

window.addEventListener("load", setupLoader);
