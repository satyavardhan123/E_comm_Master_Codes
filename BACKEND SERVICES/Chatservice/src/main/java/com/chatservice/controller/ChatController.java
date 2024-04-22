package com.chatservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.chatservice.dto.ChatDto;
import com.chatservice.service.ChatService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/chat")

@RequiredArgsConstructor
public class ChatController {

	private final ChatService chatService;

	@PostMapping("/addchat")
	public ResponseEntity<String> createTicket(@RequestBody ChatDto chatDto) {
		return chatService.CreateTicket(chatDto);
	}

	@GetMapping("/getchat")
	public List<ChatDto> getChat() {
		return chatService.getChat();
	}


	@PutMapping("/close/{ticketId}")
	public ResponseEntity<String> closeTicket(@PathVariable Long ticketId) {
		 return chatService.updateStatus(ticketId);
	}
}
