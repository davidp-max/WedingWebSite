import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, MapPin, Clock, Music, Gift, Camera, 
  CheckCircle2, Copy, Edit3, Settings, Eye, RefreshCw, X, Plus, 
  Trash2, ChevronDown, Sparkles, Navigation, Send, Check, Phone
} from 'lucide-react';

// Default initial state matching Paula & David's wedding design
const defaultWeddingData = {
  brideName: "Paula",
  groomName: "David",
  monogram: "P & D",
  weddingDate: "2025-09-20T17:00",
  dateDisplay: "Sábado, 20 de Septiembre de 2025",
  heroSubtitle: "¡Nos casamos y nos encantaría compartir este día tan especial contigo!",
  heroBgImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920",
  
  storyTitle: "Nuestra Historia",
  storyText: "Nos conocimos una tarde soleada de primavera y desde aquel instante supimos que comenzaba algo maravilloso. Tras años inolvidables de viajes, risas compartidas y miles de momentos mágicos, hemos decidido dar el paso más importante de nuestras vidas. ¡Queremos celebrar nuestro amor rodeados de la gente a la que más queremos!",
  storyImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1000",
  
  ceremony: {
    title: "La Ceremonia",
    time: "17:00 H",
    place: "Iglesia San Jerónimo el Real",
    address: "Calle de Moreto, 4, 28014 Madrid",
    description: "La ceremonia religiosa donde nos daremos el 'Sí, quiero'. Os rogamos puntualidad.",
    mapUrl: "https://maps.google.com/?q=Iglesia+San+Jeronimo+el+Real+Madrid",
    image: "https://images.unsplash.com/photo-1548625361-185483984534?auto=format&fit=crop&q=80&w=800"
  },
  
  banquet: {
    title: "El Banquete y Celebración",
    time: "19:00 H",
    place: "Finca El Olivar de Santa Teresa",
    address: "Carretera M-300, Km 12, Madrid",
    description: "Continuaremos la celebración con un cocktail de bienvenida, banquete, barra libre y fiesta hasta que el cuerpo aguante.",
    mapUrl: "https://maps.google.com/?q=Finca+El+Olivar+Madrid",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"
  },
  
  timeline: [
    { id: 1, time: "17:00", title: "Ceremonia", desc: "Llegada de invitados y daremos el 'Sí, quiero'", icon: "church" },
    { id: 2, time: "18:30", title: "Autobuses y Traslado", desc: "Salida de autobuses hacia la finca del banquete", icon: "bus" },
    { id: 3, time: "19:00", title: "Cocktail de Bienvenida", desc: "Aperitivos, jamón, cortador y música en directo en los jardines", icon: "glass" },
    { id: 4, time: "21:00", title: "Cena y Banquete", desc: "Menú especial en el salón principal", icon: "utensils" },
    { id: 5, time: "23:30", title: "Fotomatón & Barra Libre", desc: "¡Apertura del baile, fotomatón con nuestro sello P&D y fiesta!", icon: "sparkles" }
  ],
  
  gallery: [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=800"
  ],
  
  iban: "ES91 2100 0418 45 1234567890",
  ibanHolder: "Paula y David - Boda",
  giftMessage: "El mejor regalo para nosotros es poder contar con vuestra presencia en este día inolvidable. Si además deseáis hacernos un detalle para comenzar nuestro nuevo camino y nuestra Luna de Miel, os dejamos nuestra cuenta bancaria:",
  
  rsvpDeadline: "15 de Agosto de 2025",
  contactPhone: "+34 600 123 456"
};

export default App;

function App() {
  const [wedding, setWedding] = useState(() => {
    const saved = localStorage.getItem('wedding_site_data');
    return saved ? JSON.parse(saved) : defaultWeddingData;
  });

  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [isCopied, setIsCopied] = useState(false);
  const [rsvps, setRsvps] = useState(() => {
    const saved = localStorage.getItem('wedding_rsvps');
    return saved ? JSON.parse(saved) : [];
  });

  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    attending: 'si',
    guests: '1',
    dietary: '',
    song: '',
    message: ''
  });
  
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [showRsvpModal, setShowRsvpModal] = useState(false);

  // Save changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('wedding_site_data', JSON.stringify(wedding));
  }, [wedding]);

  useEffect(() => {
    localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));
  }, [rsvps]);

  // Countdown calculations
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(wedding.weddingDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [wedding.weddingDate]);

  // Handle IBAN copy
  const handleCopyIban = () => {
    navigator.clipboard.writeText(wedding.iban.replace(/\s+/g, ''));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Handle RSVP Submit
  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;
    
    const newRsvp = { ...rsvpForm, id: Date.now(), date: new Date().toLocaleDateString() };
    setRsvps([newRsvp, ...rsvps]);
    setRsvpSubmitted(true);
  };

  // Helper for updating nested object state easily
  const updateWedding = (key, value) => {
    setWedding(prev => ({ ...prev, [key]: value }));
  };

  const updateSubObject = (parent, field, value) => {
    setWedding(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const updateGalleryImage = (index, newUrl) => {
    const updated = [...wedding.gallery];
    updated[index] = newUrl;
    setWedding(prev => ({ ...prev, gallery: updated }));
  };

  // Timeline helper functions
  const addTimelineItem = () => {
    const newItem = {
      id: Date.now(),
      time: "20:00 H",
      title: "Nuevo Evento",
      desc: "Descripción del momento especial",
      icon: "clock"
    };
    setWedding(prev => ({
      ...prev,
      timeline: [...prev.timeline, newItem]
    }));
  };

  const updateTimelineItem = (id, field, value) => {
    setWedding(prev => ({
      ...prev,
      timeline: prev.timeline.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const deleteTimelineItem = (id) => {
    setWedding(prev => ({
      ...prev,
      timeline: prev.timeline.filter(item => item.id !== id)
    }));
  };

  const resetToDefault = () => {
    if (window.confirm("¿Estás seguro de restablecer el diseño por defecto para Paula y David?")) {
      setWedding(defaultWeddingData);
      localStorage.removeItem('wedding_site_data');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Dynamic Google Fonts injection for wedding elegance */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-serif-wedding { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-wedding { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* Floating Control Toolbar for Editing Page */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setEditMode(!editMode)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium shadow-lg backdrop-blur-md transition-all duration-300 border ${
            editMode 
              ? 'bg-amber-600 text-white border-amber-500 ring-4 ring-amber-500/20' 
              : 'bg-white/90 text-stone-700 hover:bg-white border-stone-200 hover:shadow-xl'
          }`}
        >
          {editMode ? <Eye className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
          <span>{editMode ? 'Modo Vista Previa' : 'Personalizar Web'}</span>
        </button>

        {editMode && (
          <button
            onClick={resetToDefault}
            title="Restablecer datos originales"
            className="p-2.5 rounded-full bg-white/90 text-stone-600 hover:text-red-600 border border-stone-200 shadow-lg hover:bg-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* EDIT MODAL / DRAWER PANEL */}
      {editMode && (
        <div className="fixed inset-y-0 left-0 z-50 w-full max-w-md bg-white shadow-2xl border-r border-stone-200 flex flex-col transition-all duration-300 transform translate-x-0">
          <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="font-serif-wedding text-xl font-bold tracking-wide">Panel de Personalización</h2>
            </div>
            <button onClick={() => setEditMode(false)} className="text-stone-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs in Panel */}
          <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto text-xs font-medium">
            <button 
              onClick={() => setActiveTab('general')}
              className={`px-4 py-3 flex-1 text-center whitespace-nowrap border-b-2 transition ${activeTab === 'general' ? 'border-amber-600 text-amber-700 font-bold bg-white' : 'border-transparent text-stone-500'}`}
            >
              General
            </button>
            <button 
              onClick={() => setActiveTab('lugares')}
              className={`px-4 py-3 flex-1 text-center whitespace-nowrap border-b-2 transition ${activeTab === 'lugares' ? 'border-amber-600 text-amber-700 font-bold bg-white' : 'border-transparent text-stone-500'}`}
            >
              Ubicaciones
            </button>
            <button 
              onClick={() => setActiveTab('programa')}
              className={`px-4 py-3 flex-1 text-center whitespace-nowrap border-b-2 transition ${activeTab === 'programa' ? 'border-amber-600 text-amber-700 font-bold bg-white' : 'border-transparent text-stone-500'}`}
            >
              Programa
            </button>
            <button 
              onClick={() => setActiveTab('fotos')}
              className={`px-4 py-3 flex-1 text-center whitespace-nowrap border-b-2 transition ${activeTab === 'fotos' ? 'border-amber-600 text-amber-700 font-bold bg-white' : 'border-transparent text-stone-500'}`}
            >
              Imágenes
            </button>
            <button 
              onClick={() => setActiveTab('regalo')}
              className={`px-4 py-3 flex-1 text-center whitespace-nowrap border-b-2 transition ${activeTab === 'regalo' ? 'border-amber-600 text-amber-700 font-bold bg-white' : 'border-transparent text-stone-500'}`}
            >
              Regalo / IBAN
            </button>
            <button 
              onClick={() => setActiveTab('respuestas')}
              className={`px-4 py-3 flex-1 text-center whitespace-nowrap border-b-2 transition ${activeTab === 'respuestas' ? 'border-amber-600 text-amber-700 font-bold bg-white' : 'border-transparent text-stone-500'}`}
            >
              RSVPs ({rsvps.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
            {activeTab === 'general' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Nombre Novia</label>
                  <input 
                    type="text" 
                    value={wedding.brideName} 
                    onChange={e => updateWedding('brideName', e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Nombre Novio</label>
                  <input 
                    type="text" 
                    value={wedding.groomName} 
                    onChange={e => updateWedding('groomName', e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Monograma / Siglas</label>
                  <input 
                    type="text" 
                    value={wedding.monogram} 
                    onChange={e => updateWedding('monogram', e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Fecha y Hora del Evento</label>
                  <input 
                    type="datetime-local" 
                    value={wedding.weddingDate} 
                    onChange={e => updateWedding('weddingDate', e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Fecha Formateada (Texto)</label>
                  <input 
                    type="text" 
                    value={wedding.dateDisplay} 
                    onChange={e => updateWedding('dateDisplay', e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Subtítulo Portada</label>
                  <textarea 
                    rows={2} 
                    value={wedding.heroSubtitle} 
                    onChange={e => updateWedding('heroSubtitle', e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Texto Nuestra Historia</label>
                  <textarea 
                    rows={4} 
                    value={wedding.storyText} 
                    onChange={e => updateWedding('storyText', e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
                  />
                </div>
              </>
            )}

            {activeTab === 'lugares' && (
              <>
                <div className="p-3 bg-stone-50 border rounded-lg space-y-3">
                  <h3 className="font-bold text-stone-800 border-b pb-1 text-base">La Ceremonia</h3>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Imagen de la Ceremonia (URL)</label>
                    <input type="text" value={wedding.ceremony.image || ''} onChange={e => updateSubObject('ceremony', 'image', e.target.value)} className="w-full p-2 border rounded mb-2 text-xs" />
                    {wedding.ceremony.image && <img src={wedding.ceremony.image} alt="Ceremonia" className="h-20 w-full object-cover rounded border" />}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Lugar</label>
                    <input type="text" value={wedding.ceremony.place} onChange={e => updateSubObject('ceremony', 'place', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Hora</label>
                    <input type="text" value={wedding.ceremony.time} onChange={e => updateSubObject('ceremony', 'time', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Dirección</label>
                    <input type="text" value={wedding.ceremony.address} onChange={e => updateSubObject('ceremony', 'address', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Enlace Google Maps</label>
                    <input type="text" value={wedding.ceremony.mapUrl} onChange={e => updateSubObject('ceremony', 'mapUrl', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border rounded-lg space-y-3">
                  <h3 className="font-bold text-stone-800 border-b pb-1 text-base">El Banquete / Fiesta</h3>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Imagen del Banquete (URL)</label>
                    <input type="text" value={wedding.banquet.image || ''} onChange={e => updateSubObject('banquet', 'image', e.target.value)} className="w-full p-2 border rounded mb-2 text-xs" />
                    {wedding.banquet.image && <img src={wedding.banquet.image} alt="Banquete" className="h-20 w-full object-cover rounded border" />}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Lugar</label>
                    <input type="text" value={wedding.banquet.place} onChange={e => updateSubObject('banquet', 'place', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Hora</label>
                    <input type="text" value={wedding.banquet.time} onChange={e => updateSubObject('banquet', 'time', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Dirección</label>
                    <input type="text" value={wedding.banquet.address} onChange={e => updateSubObject('banquet', 'address', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-500">Enlace Google Maps</label>
                    <input type="text" value={wedding.banquet.mapUrl} onChange={e => updateSubObject('banquet', 'mapUrl', e.target.value)} className="w-full p-2 border rounded" />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'programa' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-bold text-stone-800 text-base">Programa / Itinerario</h3>
                  <button
                    onClick={addTimelineItem}
                    className="flex items-center gap-1 px-3 py-1.5 bg-amber-700 text-white rounded-lg text-xs font-semibold hover:bg-amber-800 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Evento</span>
                  </button>
                </div>

                {wedding.timeline.map((item, idx) => (
                  <div key={item.id || idx} className="p-3 bg-stone-50 border border-stone-200 rounded-lg space-y-2 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-800">Evento #{idx + 1}</span>
                      <button
                        onClick={() => deleteTimelineItem(item.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition"
                        title="Eliminar evento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <label className="block text-[10px] font-semibold text-stone-500 uppercase">Hora</label>
                        <input
                          type="text"
                          value={item.time}
                          onChange={e => updateTimelineItem(item.id, 'time', e.target.value)}
                          className="w-full p-1.5 border border-stone-300 rounded text-xs font-semibold"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-semibold text-stone-500 uppercase">Título</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={e => updateTimelineItem(item.id, 'title', e.target.value)}
                          className="w-full p-1.5 border border-stone-300 rounded text-xs font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-stone-500 uppercase">Descripción</label>
                      <input
                        type="text"
                        value={item.desc}
                        onChange={e => updateTimelineItem(item.id, 'desc', e.target.value)}
                        className="w-full p-1.5 border border-stone-300 rounded text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'fotos' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Imagen de Portada (URL)</label>
                  <input type="text" value={wedding.heroBgImage} onChange={e => updateWedding('heroBgImage', e.target.value)} className="w-full p-2 border rounded mb-2" />
                  <img src={wedding.heroBgImage} alt="Preview Portada" className="h-24 w-full object-cover rounded border" />
                </div>

                <hr className="my-3" />

                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Imagen "Nuestra Historia" (URL)</label>
                  <input type="text" value={wedding.storyImage} onChange={e => updateWedding('storyImage', e.target.value)} className="w-full p-2 border rounded mb-2" />
                  <img src={wedding.storyImage} alt="Preview Historia" className="h-24 w-full object-cover rounded border" />
                </div>

                <hr className="my-3" />

                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-2">Galería de Fotos ({wedding.gallery.length} imágenes)</label>
                  <div className="space-y-3">
                    {wedding.gallery.map((img, idx) => (
                      <div key={idx} className="flex gap-2 items-center">
                        <img src={img} alt={`Preview ${idx}`} className="w-12 h-12 object-cover rounded border flex-shrink-0" />
                        <input 
                          type="text" 
                          value={img} 
                          onChange={e => updateGalleryImage(idx, e.target.value)} 
                          className="flex-1 p-2 border rounded text-xs" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'regalo' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Número de Cuenta / IBAN</label>
                  <input type="text" value={wedding.iban} onChange={e => updateWedding('iban', e.target.value)} className="w-full p-2 border rounded font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Titular de la cuenta</label>
                  <input type="text" value={wedding.ibanHolder} onChange={e => updateWedding('ibanHolder', e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">Mensaje explicativo</label>
                  <textarea rows={4} value={wedding.giftMessage} onChange={e => updateWedding('giftMessage', e.target.value)} className="w-full p-2 border rounded" />
                </div>
              </>
            )}

            {activeTab === 'respuestas' && (
              <div>
                <h3 className="font-bold text-stone-800 mb-3">Confirmaciones recibidas</h3>
                {rsvps.length === 0 ? (
                  <p className="text-stone-500 italic text-center py-6">Aún no hay confirmaciones enviadas.</p>
                ) : (
                  <div className="space-y-3">
                    {rsvps.map(item => (
                      <div key={item.id} className="p-3 bg-stone-50 border rounded-lg text-xs space-y-1">
                        <div className="flex justify-between font-bold text-stone-800">
                          <span>{item.name}</span>
                          <span className={item.attending === 'si' ? 'text-emerald-700' : 'text-red-600'}>
                            {item.attending === 'si' ? `✓ Asiste (${item.guests} pers.)` : '✕ No asiste'}
                          </span>
                        </div>
                        {item.dietary && <p className="text-stone-600"><strong>Intolerancias:</strong> {item.dietary}</p>}
                        {item.song && <p className="text-stone-600"><strong>Canción:</strong> {item.song}</p>}
                        {item.message && <p className="text-stone-600 italic">"{item.message}"</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="p-4 bg-stone-100 border-t flex justify-end">
            <button 
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800"
            >
              Cerrar y Ver Resultado
            </button>
          </div>
        </div>
      )}

      {/* HEADER / NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#portada" className="font-serif-wedding text-2xl font-bold tracking-widest text-stone-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-semibold border border-amber-300">
              {wedding.monogram}
            </span>
            <span>{wedding.brideName} & {wedding.groomName}</span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-stone-600">
            <a href="#historia" className="hover:text-amber-700 transition">Historia</a>
            <a href="#donde-y-cuando" className="hover:text-amber-700 transition">Dónde & Cuándo</a>
            <a href="#programa" className="hover:text-amber-700 transition">Programa</a>
            <a href="#galeria" className="hover:text-amber-700 transition">Galería</a>
            <a href="#rsvp" className="hover:text-amber-700 transition">Confirmar</a>
            <a href="#regalo" className="hover:text-amber-700 transition">Regalos</a>
          </nav>

          <a 
            href="#rsvp" 
            className="hidden sm:inline-flex px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow transition"
          >
            Confirmar Asistencia
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="portada" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Background Image with Warm Vignette */}
        <div className="absolute inset-0 z-0">
          <img 
            src={wedding.heroBgImage} 
            alt="Wedding Cover" 
            className="w-full h-full object-cover scale-105 animate-fade-in filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-stone-900/30" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white space-y-6 py-20">
          
          {/* Monogram Seal */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-amber-300/80 bg-stone-900/40 backdrop-blur-md p-2 shadow-2xl mb-2">
            <div className="w-full h-full rounded-full border border-amber-300/40 flex flex-col items-center justify-center text-amber-200">
              <span className="font-serif-wedding text-2xl font-bold tracking-tighter">{wedding.monogram}</span>
              <Sparkles className="w-3 h-3 text-amber-300 -mt-1" />
            </div>
          </div>

          <p className="text-amber-200 text-sm md:text-base tracking-[0.3em] uppercase font-light">
            ¡Nos Casamos!
          </p>

          <h1 className="font-serif-wedding text-5xl md:text-7xl lg:text-8xl font-normal tracking-wide drop-shadow-md">
            {wedding.brideName} <span className="text-amber-300 font-serif-wedding italic font-light">&</span> {wedding.groomName}
          </h1>

          <p className="max-w-xl mx-auto text-stone-200 text-sm md:text-base font-light leading-relaxed">
            {wedding.heroSubtitle}
          </p>

          <div className="pt-2">
            <span className="inline-block px-6 py-2 border-y border-amber-300/60 text-amber-200 text-sm md:text-lg font-serif-wedding tracking-widest uppercase">
              {wedding.dateDisplay}
            </span>
          </div>

          {/* Real-time Dynamic Countdown */}
          <div className="pt-8 grid grid-cols-4 gap-3 max-w-md mx-auto">
            <div className="bg-stone-900/60 backdrop-blur-md border border-amber-300/30 p-3 rounded-xl text-center">
              <span className="block font-serif-wedding text-2xl md:text-4xl text-amber-300 font-bold">{timeLeft.days}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300">Días</span>
            </div>
            <div className="bg-stone-900/60 backdrop-blur-md border border-amber-300/30 p-3 rounded-xl text-center">
              <span className="block font-serif-wedding text-2xl md:text-4xl text-amber-300 font-bold">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300">Horas</span>
            </div>
            <div className="bg-stone-900/60 backdrop-blur-md border border-amber-300/30 p-3 rounded-xl text-center">
              <span className="block font-serif-wedding text-2xl md:text-4xl text-amber-300 font-bold">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300">Min</span>
            </div>
            <div className="bg-stone-900/60 backdrop-blur-md border border-amber-300/30 p-3 rounded-xl text-center">
              <span className="block font-serif-wedding text-2xl md:text-4xl text-amber-300 font-bold">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-300">Seg</span>
            </div>
          </div>

          <div className="pt-6">
            <a 
              href="#rsvp" 
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg font-medium tracking-wider uppercase text-xs transition duration-300 hover:scale-105"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Confirmar Asistencia</span>
            </a>
          </div>

        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* NUESTRA HISTORIA */}
      <section id="historia" className="py-24 px-4 bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-200 to-amber-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition"></div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={wedding.storyImage} 
                alt="Paula y David Story" 
                className="w-full h-full object-cover transform transition duration-700 group-hover:scale-105"
              />
            </div>
            {/* Stamp Detail */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-amber-200 hidden sm:block">
              <p className="font-serif-wedding text-amber-800 text-xl font-bold">{wedding.monogram}</p>
              <p className="text-[10px] text-stone-500 uppercase tracking-widest">Para Siempre</p>
            </div>
          </div>

          <div className="space-y-6 text-center md:text-left">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Love Story</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900 leading-tight">
              {wedding.storyTitle}
            </h2>
            <div className="w-16 h-0.5 bg-amber-400 mx-auto md:mx-0"></div>
            <p className="text-stone-600 leading-relaxed font-light text-base md:text-lg">
              {wedding.storyText}
            </p>
            <div className="pt-2 flex items-center justify-center md:justify-start gap-4 text-amber-800">
              <div className="text-center px-4 py-2 border-r border-stone-300">
                <span className="block font-serif-wedding text-2xl font-bold">2025</span>
                <span className="text-[10px] uppercase text-stone-500 tracking-wider">Año de Boda</span>
              </div>
              <div className="text-center px-4 py-2">
                <span className="block font-serif-wedding text-2xl font-bold">100%</span>
                <span className="text-[10px] uppercase text-stone-500 tracking-wider">Amor e Ilusión</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DONDE Y CUANDO */}
      <section id="donde-y-cuando" className="py-24 px-4 bg-stone-100/70 relative">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Ubicaciones</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900">Dónde y Cuándo</h2>
            <p className="text-stone-500 text-sm max-w-md mx-auto">Te esperamos para vivir juntos cada momento inolvidable de este día.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Ceremony Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-stone-200/80 flex flex-col justify-between group">
              <div>
                {/* Location Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-200">
                  <img 
                    src={wedding.ceremony.image || "https://images.unsplash.com/photo-1548625361-185483984534?auto=format&fit=crop&q=80&w=800"} 
                    alt={wedding.ceremony.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-serif-wedding text-lg italic font-semibold text-amber-200 bg-stone-900/40 backdrop-blur-md px-3 py-1 rounded-full border border-amber-300/30">
                      {wedding.ceremony.time}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/90 text-amber-800 flex items-center justify-center shadow backdrop-blur-md">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif-wedding text-3xl font-bold text-stone-900">{wedding.ceremony.title}</h3>
                    <p className="font-semibold text-stone-800 mt-1">{wedding.ceremony.place}</p>
                    <p className="text-sm font-light text-stone-600">{wedding.ceremony.address}</p>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed pt-2 border-t">
                    {wedding.ceremony.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a 
                  href={wedding.ceremony.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Cómo llegar a la Iglesia</span>
                </a>
              </div>
            </div>

            {/* Banquet Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-stone-200/80 flex flex-col justify-between group">
              <div>
                {/* Location Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-200">
                  <img 
                    src={wedding.banquet.image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800"} 
                    alt={wedding.banquet.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                    <span className="font-serif-wedding text-lg italic font-semibold text-amber-200 bg-stone-900/40 backdrop-blur-md px-3 py-1 rounded-full border border-amber-300/30">
                      {wedding.banquet.time}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/90 text-amber-800 flex items-center justify-center shadow backdrop-blur-md">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-serif-wedding text-3xl font-bold text-stone-900">{wedding.banquet.title}</h3>
                    <p className="font-semibold text-stone-800 mt-1">{wedding.banquet.place}</p>
                    <p className="text-sm font-light text-stone-600">{wedding.banquet.address}</p>
                  </div>
                  <p className="text-xs text-stone-500 leading-relaxed pt-2 border-t">
                    {wedding.banquet.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a 
                  href={wedding.banquet.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Cómo llegar al Banquete</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PROGRAMA DEL DIA (TIMELINE) */}
      <section id="programa" className="py-24 px-4 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="text-center space-y-3">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Timing</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900">Programa del Día</h2>
            <p className="text-stone-500 text-sm">Los momentos clave que viviremos juntos</p>
          </div>

          <div className="relative border-l-2 border-amber-300/60 ml-4 md:ml-32 space-y-12">
            {wedding.timeline.map((item, index) => (
              <div key={item.id || index} className="relative pl-8 md:pl-12 group">
                
                {/* Timeline dot */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-amber-600 flex items-center justify-center text-amber-700 shadow-md group-hover:scale-110 transition">
                  <Clock className="w-4 h-4" />
                </div>

                {/* Time Badge (Desktop) */}
                <div className="md:absolute md:-left-36 md:top-1.5 md:w-28 md:text-right mb-1 md:mb-0">
                  <span className="font-serif-wedding text-2xl font-bold text-amber-800">{item.time}</span>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200/80 space-y-2">
                  <h3 className="font-serif-wedding text-2xl font-bold text-stone-900">{item.title}</h3>
                  <p className="text-stone-600 text-sm font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* GALERIA DE FOTOS */}
      <section id="galeria" className="py-24 px-4 bg-stone-100/70">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Recuerdos</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900">Galería de Momentos</h2>
            <p className="text-stone-500 text-sm">Un vistazo a nuestra aventura antes del gran día</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {wedding.gallery.map((url, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden shadow-md group">
                <img 
                  src={url} 
                  alt={`Galería ${idx + 1}`} 
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-amber-800 flex items-center justify-center shadow">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* RSVP / CONFIRMACION */}
      <section id="rsvp" className="py-24 px-4 bg-[#FAF8F5] relative">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200/90 relative overflow-hidden">
          
          {/* Subtle Top Gold Banner */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400"></div>

          <div className="text-center space-y-3 mb-8">
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">R.S.V.P.</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900">Confirmación de Asistencia</h2>
            <p className="text-stone-500 text-sm">
              Por favor, confirma tu asistencia antes del <strong className="text-stone-800">{wedding.rsvpDeadline}</strong>
            </p>
          </div>

          {rsvpSubmitted ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif-wedding text-3xl font-bold text-stone-900">¡Muchas Gracias!</h3>
              <p className="text-stone-600 max-w-md mx-auto text-sm">
                Hemos recibido tu respuesta correctamente. ¡Estamos deseando celebrar nuestro gran día contigo!
              </p>
              <button 
                onClick={() => setRsvpSubmitted(false)}
                className="mt-4 px-6 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-full hover:bg-stone-200"
              >
                Enviar otra respuesta
              </button>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Nombre Completo *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej. María García López"
                  value={rsvpForm.name} 
                  onChange={e => setRsvpForm({...rsvpForm, name: e.target.value})}
                  className="w-full p-3.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-stone-800 text-sm" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-2">¿Asistirás?</label>
                  <select 
                    value={rsvpForm.attending}
                    onChange={e => setRsvpForm({...rsvpForm, attending: e.target.value})}
                    className="w-full p-3.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-stone-800 text-sm bg-white"
                  >
                    <option value="si">¡Sí, allí estaré!</option>
                    <option value="no">Sintiéndolo mucho, no puedo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Nº de Acompañantes</label>
                  <select 
                    value={rsvpForm.guests}
                    onChange={e => setRsvpForm({...rsvpForm, guests: e.target.value})}
                    className="w-full p-3.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-stone-800 text-sm bg-white"
                  >
                    <option value="1">Solo yo (1)</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">Familia (4+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Intolerancias / Alergias Alimentarias</label>
                <input 
                  type="text" 
                  placeholder="Vegetariano, celíaco, alergia a frutos secos..."
                  value={rsvpForm.dietary} 
                  onChange={e => setRsvpForm({...rsvpForm, dietary: e.target.value})}
                  className="w-full p-3.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-stone-800 text-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-2">¿Qué canción no puede faltar en la fiesta?</label>
                <input 
                  type="text" 
                  placeholder="Título y artista..."
                  value={rsvpForm.song} 
                  onChange={e => setRsvpForm({...rsvpForm, song: e.target.value})}
                  className="w-full p-3.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-stone-800 text-sm" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-2">Mensaje para Paula y David</label>
                <textarea 
                  rows={3} 
                  placeholder="Déjanos unas palabras..."
                  value={rsvpForm.message} 
                  onChange={e => setRsvpForm({...rsvpForm, message: e.target.value})}
                  className="w-full p-3.5 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none text-stone-800 text-sm" 
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl tracking-wider uppercase text-xs shadow-lg transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Confirmación</span>
              </button>
            </form>
          )}

        </div>
      </section>

      {/* REGALOS / MESA DE REGALOS */}
      <section id="regalo" className="py-24 px-4 bg-stone-100/70">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          <div className="space-y-3">
            <div className="w-14 h-14 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
              <Gift className="w-7 h-7" />
            </div>
            <span className="text-amber-700 font-semibold text-xs tracking-widest uppercase">Mesa de Regalos</span>
            <h2 className="font-serif-wedding text-4xl md:text-5xl text-stone-900">Regalo de Boda</h2>
          </div>

          <p className="text-stone-600 max-w-lg mx-auto text-sm md:text-base leading-relaxed font-light">
            {wedding.giftMessage}
          </p>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-stone-200 max-w-lg mx-auto space-y-4">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">Titular de la cuenta</span>
              <p className="font-semibold text-stone-800">{wedding.ibanHolder}</p>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left font-mono text-sm md:text-base font-bold text-stone-900 tracking-wider">
                {wedding.iban}
              </div>

              <button 
                onClick={handleCopyIban}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition flex items-center justify-center gap-2 ${
                  isCopied 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-amber-700 hover:bg-amber-800 text-white'
                }`}
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? '¡Copiado!' : 'Copiar IBAN'}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-white py-16 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full border border-amber-400/40 mx-auto flex items-center justify-center font-serif-wedding text-2xl font-bold text-amber-300">
          {wedding.monogram}
        </div>
        <h3 className="font-serif-wedding text-3xl font-light">
          {wedding.brideName} & {wedding.groomName}
        </h3>
        <p className="text-amber-200/70 text-xs tracking-widest uppercase">
          {wedding.dateDisplay}
        </p>
        <div className="pt-6 border-t border-stone-800 text-xs text-stone-500">
          Hecho con amor para la boda de Paula & David. Inspirado en SetMyDay.
        </div>
      </footer>

    </div>
  );
}