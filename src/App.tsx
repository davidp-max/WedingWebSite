import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, MapPin, Clock, Music, Gift, Camera, 
  CheckCircle2, Copy, Edit3, Settings, Eye, RefreshCw, X, Plus, 
  Trash2, ChevronDown, Sparkles, Navigation, Send, Check, Phone
} from 'lucide-react';

// Datos por defecto de la boda
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

function App() {
  // Inicialización segura con try...catch para evitar errores si el localStorage está corrupto
  const [wedding, setWedding] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_site_data');
      return saved ? JSON.parse(saved) : defaultWeddingData;
    } catch (e) {
      return defaultWeddingData;
    }
  });

  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [isCopied, setIsCopied] = useState(false);

  const [rsvps, setRsvps] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_rsvps');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
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

  // Guardar en LocalStorage al modificar
  useEffect(() => {
    try {
      localStorage.setItem('wedding_site_data', JSON.stringify(wedding));
    } catch (e) {}
  }, [wedding]);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));
    } catch (e) {}
  }, [rsvps]);

  // Cálculo de cuenta atrás
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

  // Copiar IBAN
  const handleCopyIban = () => {
    navigator.clipboard.writeText(wedding.iban.replace(/\s+/g, ''));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  // Enviar respuesta RSVP
  const handleRsvpSubmit = (e: any) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;
    
    const newRsvp = { ...rsvpForm, id: Date.now(), date: new Date().toLocaleDateString() };
    setRsvps([newRsvp, ...rsvps]);
    setRsvpSubmitted(true);
  };

  // Funciones de actualización del estado
  const updateWedding = (key: string, value: any) => {
    setWedding((prev: any) => ({ ...prev, [key]: value }));
  };

  const updateSubObject = (parent: string, field: string, value: any) => {
    setWedding((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const updateGalleryImage = (index: number, newUrl: string) => {
    const updated = [...wedding.gallery];
    updated[index] = newUrl;
    setWedding((prev: any) => ({ ...prev, gallery: updated }));
  };

  const addTimelineItem = () => {
    const newItem = {
      id: Date.now(),
      time: "20:00 H",
      title: "Nuevo Evento",
      desc: "Descripción del momento especial",
      icon: "clock"
    };
    setWedding((prev: any) => ({
      ...prev,
      timeline: [...prev.timeline, newItem]
    }));
  };

  const updateTimelineItem = (id: number, field: string, value: any) => {
    setWedding((prev: any) => ({
      ...prev,
      timeline: prev.timeline.map((item: any) => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const deleteTimelineItem = (id: number) => {
    setWedding((prev: any) => ({
      ...prev,
      timeline: prev.timeline.filter((item: any) => item.id !== id)
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
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-serif-wedding { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-wedding { font-family: 'Montserrat', sans-serif; }
      `}</style>

      {/* Botón flotante para editar */}
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

      {/* Panel lateral de personalización */}
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

          <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto text-xs font-medium">
            <button onClick={() => setActiveTab('general')} className={`px-4 py-3 flex-1 text-center whitespace-nowrap border-b-2 transition ${activeTab === 'general' ? 'border-amber-600 text-amber-700 font-bold bg-white' : 'border-transparent text-stone-500'}`}>General</button>
            <button onClick={() => setActiveTab('lugares')} className={`px-4 py-3 flex-1 text-center whitespace-nowrap border-b-2 transition ${activeTab === 'lugares' ? 'border-amber-600 text-amber-700 font-bold bg-white' : 'border-transparent text-stone-500'}`}>Ubicaciones</button>
            <button onClick={() => setActiveTab('programa')} className={`px-4 py-3 flex-1 text-center whitespace-nowrap border-b-2 transition ${activeTab === 'programa' ? 'border-amber-600 text-amber-700 font-bold bg-white' : 'border-transparent text-stone-500'}`}>Programa</button>
            <button onClick={() => setActiveTab('fotos')} className={`px-4 py-3 flex-1 text-center whitespace-nowrap border-b-2 transition ${activeTab === 'fotos' ? 'border-amber-600 text-amber-700 font-bold bg-white' : 'border-transparent text-stone-500'}`}>Imágenes</button>
            <button onClick
