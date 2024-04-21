package com.chatservice.dto;

import jakarta.persistence.Column;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
public class ChatDto {
	
	private Long ticketID;
	private String email;
	private String name;
	private String description;
	private String state;
	@Column(name = "createdAt", nullable = false, updatable = false)
	private LocalDateTime createdAt;

	@UpdateTimestamp

	@Column(name = "updatedAt")
	private LocalDateTime closedAt;


}
