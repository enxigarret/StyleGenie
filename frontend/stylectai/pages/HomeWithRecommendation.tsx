
import React, { useState } from "react";
import useWebSocket from 'react-use-websocket';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ImageUploading from 'react-images-uploading';

import Newsletter from "@/components/NewsLetter";
import FashionRecommendations from "@/components/RecommendationList";
import {Camera, Search, Sparkles, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {addSingleRecommendations} from "@/slices/singleRecommendationsSlice";

interface Message {
  role: 'system' | 'user' | 'history';
  content: string;
  timestamp: string;
}

// interface TaskResponse {
//   achievements: string[];
//   next_steps: string;
//   user_feedback_required: boolean;
//   markdown_media_portal: string;
//   tools_required_next: string[];
//   important_notes: string;
//   task_finished: boolean;
//   step_failed: boolean;
// }

const Index = () => {

  const [showRecommendations, setShowRecommendations] = useState(false);

  const dispatch = useDispatch();

  const handleGetRecommendations = (e: React.FormEvent) => {
    console.log(searchQuery)
    e.preventDefault();
    if (!searchQuery.trim() && uploadedImage?.length == 0) return;
    sendMessage(uploadedImage[0]);
    setShowRecommendations(true);
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [taskId, setTaskId] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = React.useState([]);
  // const [taskResponse, setTaskResponse] = useState<TaskResponse | null>(null);

  //Image part
  const onChange = (uploadImage) => {
    // data for submit
    setUploadedImage(uploadImage);
  };


  const onMessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(event)
      if (data.task_id) {
        setTaskId(data.task_id);
      } else if (data.messages) {
        setMessages(prev => [...prev, {
          role: 'system',
          content: data.message,
          timestamp: new Date().toISOString()
        }]);
              // we need to check messages and convert them to recommedations
        dispatch(addSingleRecommendations([messages.content]))
      // } else if (data.achievements) {
      //   setTaskResponse(data);
      }
    };

  const {sendMessage, lastMessage, readyState } = useWebSocket(`ws://localhost:1500/ws/${taskId || 'guest'}`, {
    onOpen: () => sendMessage(JSON.stringify({ type: 'request_session' })),
    onClose: () => console.log('WebSocket connection closed!'),
    onError: (event) => console.error('WebSocket error:', event),
    onMessage: (event) => onMessage(event),
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow">
        <div className="py-4 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-4 animate-fade-in">
              <h1 className="text-2xl md:text-4xl font-playfair font-semibold mb-1">
                Discover Your <span className="text-primary">Perfect Style</span>
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Find fashion recommendations tailored to your preferences
              </p>
            </div>

            <form className="max-w-4xl mx-auto mb-2" onSubmit={handleGetRecommendations}>
              {/*<SearchBar />*/}
              <div className="relative w-full max-w-xl mx-auto mb-8">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for styles, outfits, or items..."
                  className="pl-10 py-6 text-base border bg-background/80 shadow-sm focus:ring-primary/20 focus-visible:ring-primary/20"
                />
              </div>
              {/*<ImageUpload />*/}
              <div className="w-full max-w-xl mx-auto mb-3">
      <ImageUploading
          value={uploadedImage}
          onChange={onChange}
          maxNumber={1}
          dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          onImageRemoveAll,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className={`upload-zone py-2 ${isDragging ? 'border-primary bg-secondary' : ''}`}>
            <div className="flex items-center gap-3">
              <Camera className="h-4 w-4 text-primary" />
              <button
                style={isDragging ? { color: 'red' } : undefined}
                onClick={() => {onImageRemoveAll(); onImageUpload()}}
                {...dragProps}>
                Click or Drop here
              </button>
            </div>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden border">
                <img src={image['data_url']} alt="" width="100" className="w-full object-cover h-16"/>
                <div className="image-item__btn-wrapper">
                  {/*<button onClick={() => onImageUpdate(index)}>Update</button>*/}
                  <Button variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-5 w-5 rounded-full shadow-md"
                      onClick={() => onImageRemove(index)}><X className="h-2.5 w-2.5" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
              {/*<RecommendButton onClick={handleGetRecommendations} />*/}
              <div className="w-full max-w-xl mx-auto mb-4 text-center">
                <Button type="submit"
                  disabled={!searchQuery.trim() && uploadedImage?.length == 0}
                  onClick={handleGetRecommendations}
                  className="px-6 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all bg-primary hover:bg-primary/90"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Discover Styles
                </Button>
              </div>
            </form>

            {showRecommendations && <FashionRecommendations />}
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;