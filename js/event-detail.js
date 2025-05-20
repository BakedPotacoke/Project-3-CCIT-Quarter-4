const supabaseUrl = 'https://useaetqppiwnwskgflew.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZWFldHFwcGl3bndza2dmbGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MDU2MzUsImV4cCI6MjA2MzI4MTYzNX0.-O82dmYa9tE6iWh5bC4LijaKgst5PPmiV1Hkf2tb7xM'; // Ganti dengan anon key Anda yang benar
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Kontainer detail
const detailContainer = document.getElementById('event-detail-container');

// Ambil ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
  if (!eventId) {
    showError('event tidak ditemukan di URL.');
    return;
  }

  getEventDetail(eventId);
});

// Fungsi ambil detail dari Supabase
async function getEventDetail(id) {
  try {
    const { data, error } = await supabaseClient
      .from('Event')
      .select('*')
      .eq('id', id)
      .single(); // hanya satu data

    if (error) throw error;

    displayEventDetail(data);
  } catch (error) {
    console.error('Gagal memuat detail event:', error);
    showError('Gagal memuat detail event.');
  }
}

function displayEventDetail(event) {
  const formattedDate = event.date ? formatDate(event.date) : 'Tanggal tidak tersedia';
  
  detailContainer.innerHTML = `
    <div class="event-header">
          <h1 class="event-title">${event.title}</h1>
        </div>

        <div class="event-content">
          <img src="${event.image_url}" alt="${event.title}" class="event-image">
          
          <div class="event-body">
            <div class="event-description">
              ${event.description}
            </div>
            
            <div class="event-details">
              <div class="detail-item">
                <div class="detail-icon">
                  <i class="fas fa-calendar-alt"></i>
                </div>
                <div class="detail-content">
                  <div class="detail-label">Tanggal & Waktu</div>
                  <div class="detail-value">${event.date}</div>
                </div>
              </div>
            
  `;
}

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Format tanggal tidak valid';
    }
    
    // Format tanggal dalam bahasa Indonesia
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };
    
    return date.toLocaleDateString('id-ID', options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Tanggal tidak valid';
  }
}
function showError(message) {
  detailContainer.innerHTML = `<div class="alert alert-danger text-center">${message}</div>`;
}