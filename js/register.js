const supabaseUrl = "https://useaetqppiwnwskgflew.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZWFldHFwcGl3bndza2dmbGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MDU2MzUsImV4cCI6MjA2MzI4MTYzNX0.-O82dmYa9tE6iWh5bC4LijaKgst5PPmiV1Hkf2tb7xM";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("usern").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // ==== VALIDASI INPUT ====
  if (username.length <= 6 ) {
    alert("Username must be at least 6 characters long.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  const numberOrSpecialRegex = /[0-9!@#$%^&*]/;
  if (!numberOrSpecialRegex.test(password)) {
    alert(
      "Password must contain at least one number or special character"
    );
    return;
  }

  // ==== CEK APAKAH EMAIL SUDAH TERDAFTAR ====
  const { data: existingUser, error: fetchError } = await supabaseClient
  .from("users")
  .select("id")
  .eq("email", email)
  .maybeSingle();

if (fetchError) {
  alert("Error checking existing user: " + fetchError.message);
  return;
}

if (existingUser) {
  alert("This email is already registered.");
  return;
}

  // ==== INSERT KE DATABASE ====
  const { data, error } = await supabaseClient
    .from("users")
    .insert([{ username, email, password }]);

  if (error) {
    alert("Error registering user: " + error.message);
  } else {
    alert("User registered successfully!");
    // Optional: redirect to login page
    window.location.href = "login.html";
  }
});
