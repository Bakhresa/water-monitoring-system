let chartInstance = null;

// Function to get CSS custom property value
function getCSSVariable(variable, fallback) {
  try {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim() || fallback
    );
  } catch (e) {
    return fallback;
  }
}

// Define colors from CSS variables with fallbacks
const primaryColor = getCSSVariable("--primary", "#1e40af");
const secondaryColor = getCSSVariable("--secondary", "#0d9488");

async function fetchWaterData(timeRange = "week") {
  const loading = document.getElementById("loading");
  loading.style.display = "block";

  try {
    const response = await fetch(`api/fetch_data.php?filter=${timeRange}`);
    const data = await response.json();

    // Update Water Quality
    const latest = data[0] || {};
    document.getElementById("quality-data").innerText = `pH: ${
      latest.ph || "N/A"
    }, DO: ${latest.dissolved_oxygen || "N/A"} mg/L, Turbidity: ${
      latest.turbidity || "N/A"
    } NTU`;

    // Update Water Usage
    document.getElementById("usage-data").innerText = `Latest: ${
      latest.water_usage || "N/A"
    } L`;

    // Update Leak Detection
    document.getElementById("leak-data").innerText = latest.leak_detected
      ? `Detected at ${latest.leak_location || "Unknown"}`
      : "No leaks detected";

    // Display Alerts
    const alertsContainer = document.getElementById("alerts");
    alertsContainer.innerHTML = "";
    if (latest.turbidity > 1.9) {
      const alert = document.createElement("div");
      alert.className = "alert";
      alert.innerHTML = `Warning: High turbidity detected at ${new Date(
        latest.timestamp
      ).toLocaleString()}! <span class="dismiss">×</span>`;
      alertsContainer.appendChild(alert);
    }
    if (latest.leak_detected) {
      const alert = document.createElement("div");
      alert.className = "alert";
      alert.innerHTML = `Alert: Leak detected at ${
        latest.leak_location || "Unknown"
      } on ${new Date(
        latest.timestamp
      ).toLocaleString()}! <span class="dismiss">×</span>`;
      alertsContainer.appendChild(alert);
    }

    // Handle Dismiss Alerts
    document.querySelectorAll(".dismiss").forEach((btn) => {
      btn.addEventListener("click", () => btn.parentElement.remove());
    });

    // Prepare Chart Data
    const chartType = document.getElementById("chart-type").value;
    const labels = data.map((d) => new Date(d.timestamp).toLocaleString());
    const phData = data.map((d) => d.ph);
    const usageData = data.map((d) => d.water_usage);

    // Destroy existing chart
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Render Chart
    const ctx = document.getElementById("waterChart").getContext("2d");
    chartInstance = new Chart(ctx, {
      type: chartType,
      data: {
        labels: labels.reverse(),
        datasets: [
          {
            label: "pH",
            data: phData.reverse(),
            borderColor: primaryColor,
            backgroundColor: "rgba(30, 64, 175, 0.2)",
            yAxisID: "y",
            fill: chartType === "bar" ? true : false,
          },
          {
            label: "Water Usage (Liters)",
            data: usageData.reverse(),
            borderColor: secondaryColor,
            backgroundColor: "rgba(13, 148, 136, 0.2)",
            yAxisID: "y1",
            fill: chartType === "bar" ? true : false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            position: "left",
            title: { display: true, text: "pH" },
            beginAtZero: false,
          },
          y1: {
            position: "right",
            title: { display: true, text: "Liters" },
            beginAtZero: true,
            grid: { drawOnChartArea: false },
          },
          x: {
            title: { display: true, text: "Time" },
          },
        },
        plugins: {
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("quality-data").innerText = "Error loading data";
    document.getElementById("usage-data").innerText = "Error loading data";
    document.getElementById("leak-data").innerText = "Error loading data";
    const alertsContainer = document.getElementById("alerts");
    alertsContainer.innerHTML =
      '<div class="alert">Error: Unable to fetch data. Please try again later.</div>';
  } finally {
    loading.style.display = "none";
  }
}

// Handle Time Range Filter
document.getElementById("time-range").addEventListener("change", (e) => {
  fetchWaterData(e.target.value);
});

// Handle Chart Type Toggle
document.getElementById("chart-type").addEventListener("change", (e) => {
  fetchWaterData(document.getElementById("time-range").value);
});

// Handle Refresh Button
document.getElementById("refresh-btn").addEventListener("click", () => {
  fetchWaterData(document.getElementById("time-range").value);
});

// Real-Time Polling
function startPolling() {
  fetchWaterData(document.getElementById("time-range").value);
  setInterval(() => {
    fetchWaterData(document.getElementById("time-range").value);
  }, 5000);
}

// Initialize AOS
AOS.init({ duration: 800, once: true });

// Start Polling
startPolling();
