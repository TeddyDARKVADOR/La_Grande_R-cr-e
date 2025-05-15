// Script du chatbot
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing chatbot');
    
    // Récupérer les éléments du DOM
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotBadge = document.getElementById('chatbotBadge');
    
    console.log('Chatbot elements found:', {
        button: chatbotButton !== null,
        window: chatbotWindow !== null,
        close: chatbotClose !== null,
        input: chatbotInput !== null,
        send: chatbotSend !== null,
        messages: chatbotMessages !== null,
        badge: chatbotBadge !== null
    });
    
    // Ouvrir/fermer la fenêtre de chat
    if (chatbotButton) {
        chatbotButton.addEventListener('click', function() {
            console.log('Chatbot button clicked');
            if (chatbotWindow) {
                chatbotWindow.classList.toggle('active');
                if (chatbotBadge) {
                    chatbotBadge.classList.remove('active');
                }
            }
        });
    }
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            console.log('Chatbot close clicked');
            if (chatbotWindow) {
                chatbotWindow.classList.remove('active');
            }
        });
    }
    
    // Afficher le badge après un délai
    setTimeout(() => {
        if (chatbotBadge) {
            console.log('Activating chatbot badge');
            chatbotBadge.classList.add('active');
        }
    }, 3000);
    
    // Gérer l'envoi de messages
    const sendMessage = () => {
        if (!chatbotInput || !chatbotMessages) return;
        
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        console.log('Sending message:', message);
        
        // Ajouter le message de l'utilisateur
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Simuler la réponse du bot
        showTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000 + Math.random() * 1000);
    };
    
    if (chatbotSend) {
        chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    
    // Ajouter un message à la conversation
    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('chatbot-message', sender);
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };
    
    // Afficher l'indicateur de saisie
    const showTypingIndicator = () => {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('chatbot-typing');
        typingDiv.id = 'typingIndicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingDiv.appendChild(dot);
        }
        
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };
    
    // Supprimer l'indicateur de saisie
    const removeTypingIndicator = () => {
        const typingDiv = document.getElementById('typingIndicator');
        if (typingDiv) typingDiv.remove();
    };
    
    // Obtenir la réponse du bot basée sur le message
    const getBotResponse = (message) => {
        message = message.toLowerCase();
        
        // Réponses concernant le statut Petit Prince/Petite Princesse
        if (message.includes('prince') || message.includes('princesse')) {
            return "Le statut Petit Prince ou Petite Princesse est notre niveau d'entrée ! Voici les avantages : 1€ = 1 point, 100 points offerts à l'inscription, cadeau d'anniversaire pour l'enfant, points doublés sur les marques exclusives et accès aux offres membres. Parfait pour commencer à profiter de notre programme !";
        } 
        // Réponses concernant le statut Chevalier
        else if (message.includes('chevalier') || message.includes('5%')) {
            return "Le statut Chevalier est notre niveau intermédiaire ! Tous les avantages du statut Prince/Princesse, plus : chèque fidélité de 10€ dès 350 points cumulés, accès prioritaire aux ventes privées, un atelier gratuit par an, et des recommandations personnalisées selon l'âge de votre enfant !";
        } 
        // Réponses concernant le statut Roi/Reine
        else if (message.includes('roi') || message.includes('reine') || message.includes('10%')) {
            return "Les statuts Roi et Reine sont nos plus prestigieux ! Profitez de : chèques fidélité de 10€, livraison gratuite dès 30€ d'achat, 2 ateliers gratuits par an, doublement des points 2 jours par an, cadeau de fin d'année, service client prioritaire et invitations aux événements VIP. Le summum de notre programme de fidélité !";
        } 
        // Comment gagner des points
        else if (message.includes('point') || message.includes('cumul')) {
            return "Pour gagner des points : 1€ dépensé = 1 point. Vous recevez 100 points à l'inscription, 100 points pour l'anniversaire de l'enfant et 50 points lors d'opérations ponctuelles. Les points sont doublés sur les marques exclusives ! Avec 350 points, vous obtenez un chèque fidélité de 10€.";
        }
        // Comment monter en niveau
        else if (message.includes('monter') || message.includes('progresser') || message.includes('palier')) {
            return "Pour progresser dans notre programme : vous débutez au niveau Petit Prince/Princesse. En cumulant vos achats, vous pouvez atteindre le statut Chevalier, puis Roi/Reine pour encore plus d'avantages. Plus vous jouez, plus vous gagnez !";
        }
        // Avantages généraux du programme
        else if (message.includes('avantage') || message.includes('bénéfice') || message.includes('programme')) {
            return "Notre programme de fidélité offre de nombreux avantages : cumul de points (1€ = 1 point), chèques fidélité dès 350 points, cadeaux d'anniversaire, accès prioritaire aux offres spéciales, ateliers gratuits selon votre statut, et bien plus encore ! Découvrez tous les détails en cliquant sur 'DÉCOUVRIR LE PROGRAMME' sur notre page d'accueil.";
        } 
        // Inscription au programme
        else if (message.includes('inscri')) {
            return "Pour vous inscrire au programme de fidélité, c'est simple et gratuit ! Cliquez sur le bouton 'DÉCOUVRIR LE PROGRAMME' sur notre page d'accueil ou rendez-vous en magasin avec une pièce d'identité. Vous recevrez 100 points offerts dès votre inscription !";
        } 
        // Chèques fidélité
        else if (message.includes('chèque') || message.includes('350 point')) {
            return "Les chèques fidélité de 10€ sont automatiquement déclenchés dès que vous atteignez 350 points. Ils sont utilisables en magasin ou sur notre site web. C'est notre façon de vous remercier pour votre fidélité !";
        }
        // Ateliers
        else if (message.includes('atelier')) {
            return "Nos ateliers sont des activités créatives et ludiques organisées en magasin. Les Chevaliers bénéficient d'1 atelier gratuit par an, tandis que les Rois et Reines peuvent profiter de 2 ateliers gratuits. Une excellente façon d'occuper les enfants tout en s'amusant !";
        }
        // Messages de base
        else if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
            return "Bonjour! Je suis Merlin, l'assistant virtuel dédié au programme de fidélité. Comment puis-je vous aider aujourd'hui? Vous pouvez me poser des questions sur nos différents statuts (Prince/Princesse, Chevalier, Roi/Reine) ou sur les avantages du programme.";
        } 
        else if (message.includes('merci')) {
            return "Je vous en prie! N'hésitez pas si vous avez d'autres questions sur notre programme de fidélité. 😊 Et n'oubliez pas de vous inscrire pour profiter de tous nos avantages!";
        } 
        // Réponse par défaut
        else {
            return "Je suis spécialisé dans notre programme de fidélité par paliers. Vous pouvez me demander des informations sur nos 3 niveaux : Petit Prince/Princesse, Chevalier, ou Roi/Reine du Jeu, comment gagner des points ou comment vous inscrire!";
        }
    };
    
    // Notification automatique après un délai
    setTimeout(() => {
        if (chatbotWindow && chatbotBadge && !chatbotWindow.classList.contains('active')) {
            console.log('Setting notification badge');
            chatbotBadge.textContent = '1';
            chatbotBadge.classList.add('active');
        }
    }, 20000);
});