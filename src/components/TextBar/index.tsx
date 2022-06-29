import { useRef } from "react";
import { Box, Button } from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { Input, useColorModeValue } from "@chakra-ui/react";

const TextBar = (props: any) => {
 
   // Toggle Settings
   const bg = useColorModeValue("#06d755","#202C33");
   const textColor = useColorModeValue("#000","#fff");
   const faIcon = useColorModeValue("#202C33","#fff");
   // ---------------

  const input: any = useRef(null);
    const sendMessage = (e: any) => {
      e.preventDefault();
      const message = input.current.value;
      if(input.current.value.trim().length === 0) {
        toast.error("Please enter a valid message");
      }
      else if (message.length > 0 ){
        props?.onSend && props.onSend(input.current.value);
      }
      input.current.value = "";
    };
  const sendMessageIfEnter = (e: any) => {
    if (e.keyCode === 13 && input.current.value.length > 0) {
      sendMessage(e);
    }
    
  };

  return (
    <>
      {/* <div className="chat__footer" onBlur={handleBlur} >
	        <form>
	            <input
	            	ref={inputRef}
	                value={input}
	                onClick={handleFocus}
	                onChange={!recording ? change : null}
	                onKeyPress={recording ? () => false : null}
	                onFocus={() => setFocus(true)}
	                placeholder="Type a message"
	            />
	           
		        	<>
		        		<label
			        		for="capture"  
			            	class="send__btn" 
			            >
			                {btnIcons}
			            </label> 
			        	<input
			        		style={{display: "none"}} 
				        	type="file" 
				            id="capture"  {navigator.mediaDevices.getUserMedia && window.MediaRecorder ?
                      <button 
                        type="submit" 
                        class="send__btn" 
                        onClick={input !== "" || (input === "" && image) ? sendMessage : startRecording}
                      >
                          {btnIcons}
                      </button>	
                  
				            accept="audio/*" 
				            capture
				            onChange={audioInputChange}  
			            />
		        	</>
		        
	            
	        </form>
	        
	    </div> */}
      <ToastContainer />
      <Box className="chat__footer">
        <form>
          <Input
            color={"black"}
            placeholder="Type your message"
            _placeholder={{color: "black"}}
            ref={input}
            onKeyDown={sendMessageIfEnter}
          />
          <Button bgColor={bg} color={faIcon} w="46px" h="46px" borderRadius="50%" boxShadow="0px 0px 2px 0px #0000005e" border="none"  className="send__btn" onClick={sendMessage} type="submit">
           <FontAwesomeIcon icon={faPaperPlane}  />
          </Button>
        </form>
      </Box>
    </>
  );
};

export default TextBar;
