'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AIPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'image'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setMessages(prev => [...prev, data.choices[0].message]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Désolé, une erreur est survenue. Veuillez réessayer."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageGeneration = async (e) => {
    e.preventDefault();
    if (!imagePrompt.trim() || isImageLoading) return;

    setIsImageLoading(true);
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: imagePrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de génération d\'image');
      }

      setGeneratedImage(data.imageUrl);
    } catch (error) {
      console.error('Error:', error);
      alert('Erreur lors de la génération de l\'image. Veuillez réessayer.');
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/60 to-black/30 dark:from-black/80 dark:to-black/60">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white dark:text-white">AI Studio</h1>
          <Link 
            href="/"
            className="text-gray-200 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-400 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>

        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'chat'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Chat IA
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'image'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Génération d'Images
          </button>
        </div>

        <div className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-lg p-6 mb-4">
          {activeTab === 'chat' ? (
            <>
              <div className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    Commencez la conversation en posant une question...
                  </p>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-500/20 ml-auto max-w-[80%]'
                          : 'bg-gray-600/20 mr-auto max-w-[80%]'
                      }`}
                    >
                      <p className="text-gray-200 dark:text-gray-200 whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="bg-gray-600/20 p-4 rounded-lg mr-auto max-w-[80%]">
                    <p className="text-gray-400">L'IA réfléchit...</p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 p-2 rounded-lg bg-white/5 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Envoyer
                </button>
              </form>
            </>
          ) : (
            <div className="space-y-6">
              <form onSubmit={handleImageGeneration} className="flex gap-2">
                <input
                  type="text"
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Décrivez l'image que vous souhaitez générer..."
                  className="flex-1 p-2 rounded-lg bg-white/5 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  disabled={isImageLoading}
                />
                <button
                  type="submit"
                  disabled={isImageLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Générer
                </button>
              </form>

              <div className="flex justify-center items-center min-h-[400px] bg-gray-900/50 rounded-lg">
                {isImageLoading ? (
                  <p className="text-gray-400">Génération de l'image en cours...</p>
                ) : generatedImage ? (
                  <div className="relative w-full max-w-[512px] aspect-square">
                    <Image
                      src={generatedImage}
                      alt="Generated image"
                      fill
                      className="rounded-lg object-contain"
                    />
                  </div>
                ) : (
                  <p className="text-gray-400">
                    L'image générée apparaîtra ici...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
