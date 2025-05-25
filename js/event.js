// Konfigurasi Supabase
const supabaseUrl = 'https://useaetqppiwnwskgflew.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzZWFldHFwcGl3bndza2dmbGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3MDU2MzUsImV4cCI6MjA2MzI4MTYzNX0.-O82dmYa9tE6iWh5bC4LijaKgst5PPmiV1Hkf2tb7xM'; 

// Elemen kontainer untuk menampilkan event
const eventsContainer = document.getElementById('events-container');

// Inisialisasi client dan fungsi utama
document.addEventListener('DOMContentLoaded', function() {
  try {
    console.log('DOM loaded, initializing Supabase client...');
    
    // Verifikasi bahwa supabase ada dan memiliki createClient
    if (typeof supabase === 'undefined') {
      throw new Error('Objek supabase tidak tersedia. Pastikan script Supabase dimuat dengan benar.');
    }
    
    if (typeof supabase.createClient !== 'function') {
      throw new Error('supabase.createClient tidak tersedia. Versi Supabase tidak kompatibel.');
    }
    
    // Inisialisasi klien Supabase
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
        
    // Mulai pemuatan data
    getEvents(supabaseClient);
    
  } catch (error) {
    console.error('Initialization error:', error);
    showError(error.message);
  }
});

// Fungsi untuk mengambil data dari Supabase
async function getEvents(client) {
  try {
    console.log('Fetching events from Supabase...');
    
    // Pastikan client memiliki fungsi from
    if (!client || typeof client.from !== 'function') {
      throw new Error('Supabase client tidak valid atau tidak memiliki fungsi .from()');
    }
    
    // Ambil data dari tabel Event - PERBAIKAN: semua field dalam satu string
    const { data, error } = await client
      .from('Event')
      .select('id, title, image_url, description, date')  // ✅ Fixed: all fields in one string
      .order('id', { ascending: false });
    
    console.log('Supabase response:', { data, error });
    
    if (error) {
      throw error;
    }
    
    // Hapus loading spinner
    removeLoadingSpinner();
    
    // Tampilkan data ke halaman
    if (data && data.length > 0) {
      console.log(`Displaying ${data.length} events`);
      displayEvents(data);
    } else {
      console.log('No data found');
      eventsContainer.innerHTML = '<div class="col-12"><p class="text-center">Tidak ada event yang tersedia.</p></div>';
    }
  } catch (error) {
    console.error('Error fetching events:', error);
    showError(`Gagal memuat data: ${error.message}`);
  }
}

// Fungsi untuk menampilkan events
function displayEvents(events) {
  let htmlContent = '';
  
  events.forEach(event => {
      // Format tanggal jika ada
      const formattedDate = event.date ? formatDate(event.date) : 'Tanggal tidak tersedia';
      
      htmlContent += `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 event-card" data-event-id="${event.id}" style="cursor: pointer;">
          <img src="${event.image_url || 'https://via.placeholder.com/300x200?text=Pokemon+Event'}" class="card-img-top" alt="${event.title}">
          <div class="card-body">
            <h5 class="card-title">${event.title}</h5>
          </div>
          <div class="card-footer d-flex justify-content-end">
            <small class="text-muted">${formattedDate}</small>
          </div>
        </div>
      </div>
    `;
  });
  
  eventsContainer.innerHTML = htmlContent;
  
  // Tambahkan event listener ke tombol detail
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', function() {
      const eventId = this.getAttribute('data-event-id');
      // Redirect ke halaman detail dengan event ID
      window.location.href = `event-detail.html?id=${eventId}`;
    });
  });
}

// Fungsi untuk memformat tanggal
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

// Fungsi helper untuk menampilkan error
function showError(message) {
  removeLoadingSpinner();
  eventsContainer.innerHTML = `<div class="col-12"><p class="text-center text-danger">${message}</p></div>`;
}

// Fungsi untuk menghapus loading spinner
function removeLoadingSpinner() {
  const loadingSpinner = document.querySelector('.loading-spinner');
  if (loadingSpinner) {
    loadingSpinner.remove();
  }
}