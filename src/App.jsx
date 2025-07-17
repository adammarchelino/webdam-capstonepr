import React, { useState, useEffect,useCallback } from 'react';
import { Home, User, Code, Folder, Mail, Linkedin, Github, Youtube, Instagram, Menu, X,Loader2} from 'lucide-react';

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Komponen Navbar
const Navbar = React.memo(({ scrollToSection, toggleMenu, isMenuOpen }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Porto with hover animation */}
          <div className="text-2xl font-bold text-gray-800 transform hover:scale-105 transition-transform duration-300">
            <a 
              href="#" 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-blue-600 transition-colors duration-300 flex items-center gap-2"
            >
              <span className="animate-pulse">🎓</span>
              <span>
                Portofolio
              </span>
            </a>
          </div>

          {/* Hamburger Menu Button with Animation */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="relative text-gray-800 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Hamburger to X Animation */}
                <span className={`absolute w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-0' : 'rotate-0 -translate-y-2'
                }`}></span>
                <span className={`absolute w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}></span>
                <span className={`absolute w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 translate-y-0' : 'rotate-0 translate-y-2'
                }`}></span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex md:items-center md:space-x-2">
            {[
              { href: 'hero', icon: Home, label: 'Beranda' },
              { href: 'about', icon: User, label: 'Tentang' },
              { href: 'skills', icon: Code, label: 'Keahlian' },
              { href: 'projects', icon: Folder, label: 'Galeri' },
              { href: 'contact', icon: Mail, label: 'Kontak' }
            ].map((item) => (
              <li key={item.href}>
                <a
                  href={`#${item.href}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                  className="group relative flex items-center py-2 px-4 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 transform hover:scale-105"
                >
                  <item.icon className="mr-2 group-hover:animate-pulse" size={20} />
                  <span className="font-medium">{item.label}</span>
                  {/* Animated underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Navigation with Slide Animation */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
        isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <ul className="py-4 px-4 space-y-2">
            {[
              { href: 'hero', icon: Home, label: 'Beranda' },
              { href: 'about', icon: User, label: 'Tentang' },
              { href: 'skills', icon: Code, label: 'Keahlian' },
              { href: 'projects', icon: Folder, label: 'Galeri' },
              { href: 'contact', icon: Mail, label: 'Kontak' }
            ].map((item, itemIndex) => (
              <li key={item.href}>
                <a
                  href={`#${item.href}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href); toggleMenu(); }}
                  className={`group flex items-center py-3 px-4 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 transform hover:translate-x-2 ${
                    isMenuOpen ? 'animate-slideInLeft' : ''
                  }`}
                  style={{ animationDelay: `${itemIndex * 100}ms` }}
                >
                  <item.icon className="mr-3 group-hover:animate-bounce" size={20} />
                  <span className="font-medium">{item.label}</span>
                  {/* Arrow indicator */}
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
});

// Komponen Hero Section
const Hero = React.memo(() => {
  return (
    <section id="hero" className="relative overflow-hidden min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 pt-24 flex flex-col md:flex-row items-center justify-center text-center md:text-left">
  <div className="blob-bg"></div>
  <div className="relative z-10 md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0 md:mr-12">
    <img
      src="/adam-marchelino-pfp.jpg"
      alt="Foto Profil"
      className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-xl border-4 border-white transform hover:scale-105 transition-transform duration-300"
    />
  </div>
  <div className="relative z-10 md:w-1/2">
    <p className="text-lg text-gray-600 mb-2">Halo 👋, perkenalkan saya</p>
    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
      Adam Marchelino
    </h1>
    <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
      Junior Developer
      <span className="text-gray-800"> | </span>
      <span className="text-gray-600">Front End</span>
    </h2>
    <p className="text-lg text-gray-700 max-w-xl mx-auto md:mx-0 mb-8">
      Saya sedang belajar membangun website modern dengan Vite + React dan Tailwind CSS. Saya Learning By Doing sambil terus memperdalam apa yang saya pelajari setiap harinya.
    </p>
    <div className="flex justify-center md:justify-start space-x-4">
      <a
        href="#contact"
        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg transform hover:scale-105"
      >
        Hubungi Saya
      </a>
      <a
        href="https://share.evernote.com/note/08c0a2aa-1dcd-5b05-7dc0-8dddd5181131"
        target='_blank'
        rel="noopener noreferrer"
        className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-lg transform hover:scale-105"
      >
        Learning Style
      </a>
    </div>
  </div>
</section>
  );
});

// Komponen About Section
const About = React.memo(() => {
  return (
    <section id="about" className="scroll-mt-15 py-33 bg-gray-700 p-8 text-center">
      <h2 className="text-3xl font-bold text-white bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg shadow-md mb-8">👑 Tentang Saya</h2>
      <div className="max-w-4xl mx-auto text-lg text-white leading-relaxed">
        <p className="mb-4">
          Hai, saya Adam Marchelino. <br/>Saya masih tergolong baru di dunia pemrograman sekitar 2 bulan serius belajar<br/>Saya punya keinginan kuat untuk belajar, dan terus mengupgrade value saya.
        </p>
        <p className="mb-4">
          Saya tertarik pada pemrograman karena semuanya cocok dengan pola pikir saya, saya menyukai critical thinking dan logical thinking. Saat ini saya sedang mendalami Front-end, Cybersecurity, dan Artificial Intelligence. 
        </p>
        <p>
          Sebagai pemula, saya punya pola pikir kritis dan rasa ingin tahu yang tinggi, jadi saya suka penasaran kenapa sesuatu bisa bekerja, bukan cuma tau bagaimana caranya.
        </p>
      </div>
    </section>
  );
});

// Komponen Skills Section
const Skills = React.memo(() => {
  const skills = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Prompt Engineer', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
    { name: 'Basic Kali Linux', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg' },
  ];

  return (
    <section id="skills" className="scroll-mt-15 py-30 bg-gray-50 p-8 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">🛠️ Keahlian Saya</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <img src={skill.icon} alt={skill.name} loading="lazy" className="w-16 h-16 mb-2" />
            <p className="text-lg font-semibold text-gray-700">{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

// Komponen Projects Section
const Projects = React.memo(() => {
  const projects = [
    {
      title: 'Fundamental Cyber Security',
      description: 'Saya mempelajari dasar-dasar keamanan siber seperti jenis serangan, teknik perlindungan data, dan cara menjaga keamanan sistem dari ancaman digital.',
      image: 'https://codingstudio.id/wp-content/uploads/2020/06/LOGO-MASTERFILE.png',
      link: 'https://member.codingstudio.id/certificate/6BOtGK7Qnx',
    },
    {
      title: 'Student Developer Initiative',
      description: 'Saya mengikuti kegiatan kolaborasi Hacktiv8 dan IBM untuk mempelajari AI dalam pengembangan aplikasi.',
      image: 'https://www.hacktiv8.com/kitabisa/hacktiv8-short.svg',
      link: 'https://www.instagram.com/p/DL9gjSipN_OmBWf1ghlKY57J6ebq203MhZB0sA0/',
    },
    {
      title: 'Learning Milestones',
      description: 'Perjalanan belajar programming melalui berbagai platform, belajar dengan prinsip yang dimiliki dan mampu memanfaatkan resource untuk dipelajari.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/FreeCodeCamp_logo.svg',
      link: 'https://www.freecodecamp.org/Adam_Marchelino',
    },
  ];

  return (
    <section id="projects" className="scroll-mt-15 py-16 bg-white p-8 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Galeri Saya</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <img src={project.image} alt={project.title} loading="lazy" className="w-full h-40 object-contain bg-white p-4" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-700 mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-md font-semibold hover:bg-blue-700 transition-colors duration-300"
              >
                Lihat
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

// Komponen Contact Section
const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initializeAuthAndFirestore = async () => {
      try {
        await signInAnonymously(auth);

        const currentUser = auth.currentUser;
        if (currentUser) {
          setUserId(currentUser.uid);
        } else {
          setUserId(crypto.randomUUID());
        }
      } catch (error) {
        console.error("Error signing in:", error);
        setUserId(crypto.randomUUID());
      }
    };

    initializeAuthAndFirestore();

    // Listener untuk perubahan state autentikasi
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null); // User signed out
      }
    });

    return () => unsubscribeAuth(); // Cleanup listener
  }, []);

  useEffect(() => {
    if (userId) {
      const messagesCollectionRef = collection(db, 'messages');
      const q = query(messagesCollectionRef, orderBy('timestamp', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(fetchedMessages);
      }, (error) => {
        console.error("Error fetching messages:", error);
      });

      return () => unsubscribe(); // Cleanup listener
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('Mengirim...');
    try {
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
        userId: userId, 
      });
      setStatus('Pesan berhasil terkirim!');
      setName('');
      setEmail('');
      setMessage('');
      
      // Clear status setelah 3 detik
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus('Gagal mengirim pesan. Silakan coba lagi.');
      
      // Clear status setelah 3 detik
      setTimeout(() => setStatus(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-5 py-16 bg-gray-50 p-8 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Hubungi Saya</h2>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <p className="text-gray-700 mb-6">
          Saya Terbuka Untuk Diskusi, Atau Pertanyaan <br />
          Silahkan Isi Form Di Bawah Ini.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-left text-gray-700 text-sm font-bold mb-2">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-left text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-left text-gray-700 text-sm font-bold mb-2">
              Pesan
            </label>
            <textarea
              id="message"
              rows="5"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Pesan Anda"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg transform hover:scale-105 ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin inline mr-2" size={20} />
                Mengirim...
              </>
            ) : (
              '💌 Kirim Pesan'
            )}
          </button>
          
          {/* Tampilkan status pesan */}
          {status && (
            <div className={`mt-4 p-3 rounded-lg ${
              status.includes('berhasil') 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : status.includes('Gagal') 
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}>
              {status}
            </div>
          )}
        </form>

        {userId && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Pesan dari Pengguna Lain</h3>
            {messages.length > 0 ? (
            <div className="space-y-4 text-left max-h-[300px] overflow-y-auto pr-2 rounded-lg border border-gray-200 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
  {messages.map((msg) => (
    <div key={msg.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition duration-300">
  <div className="flex items-start gap-3">
    <div className="bg-blue-100 text-blue-700 w-10 h-10 flex items-center justify-center rounded-full font-bold">
      {msg.name?.charAt(0).toUpperCase()}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-gray-800">{msg.name} ({msg.email})</p>
        <p className="text-xs text-gray-500">
          {msg.timestamp ? new Date(msg.timestamp.seconds * 1000).toLocaleString() : '...'}
        </p>
      </div>
      <p className="text-gray-700 mt-1">{msg.message}</p>
    </div>
  </div>
</div>
  ))}
</div>        
            ) : (
              <p className="text-gray-600">Belum ada pesan.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// Komponen Footer
const Footer = React.memo(() => {
  return (
    <footer className="bg-gray-800 text-white py-8 text-center rounded-t-lg">
      <div className="flex justify-center space-x-6 mb-6">
        <a href="https://www.linkedin.com/in/adam-marchelino/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
          <Linkedin size={28} />
        </a>
        <a href="https://github.com/adammarchelino" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
          <Github size={28} />
        </a>
        <a href="https://www.youtube.com/@adam_marchelino" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors duration-300">
          <Youtube size={30} />
        </a>
        <a href="https://www.instagram.com/adam_marchelino" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
          <Instagram size={28} />
        </a>
      </div>
      <p className="text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Adam Marchelino. Hak Cipta Dilindungi.
      </p>
    </footer>
  );
});

// Komponen Utama Aplikasi
const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fungsi untuk scroll ke bagian tertentu
const scrollToSection = useCallback((id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}, []);

  // Fungsi untuk toggle menu mobile
const toggleMenu = useCallback(() => {
  setIsMenuOpen(!isMenuOpen);
}, [isMenuOpen]);

  return (
    <div className="font-inter antialiased">

      <Navbar scrollToSection={scrollToSection} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;