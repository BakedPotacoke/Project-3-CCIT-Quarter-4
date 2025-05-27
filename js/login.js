const supabaseUrl = "https://useaetqppiwnwskgflew.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZWFldHFwcGl3bndza2dmbGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MDU2MzUsImV4cCI6MjA2MzI4MTYzNX0.-O82dmYa9tE6iWh5bC4LijaKgst5PPmiV1Hkf2tb7xM";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const { data, error } = await supabaseClient
      .from("users")
      .select("id, email, role")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      alert("Login failed: invalid email or password");
      return;
    }

    // Simpan informasi user di sessionStorage
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: data.id,
        email: data.email,
        role: data.role,
      })
    );

    // Redirect sesuai role
    if (data.role === "admin") {
      alert("Login as Admin successful! Redirecting...");
      window.location.href = "dashboard.html";
    } else {
      alert("Login successful! Redirecting...");
      window.location.href = "index.html";
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("An unexpected error occurred.");
  }
});
