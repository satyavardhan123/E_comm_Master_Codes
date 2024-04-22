package com.buyer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.buyer.dto.BuyerDto;
import com.buyer.dto.LoginDto;
import com.buyer.dto.PaymentDto;
import com.buyer.service.BuyerService;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import jakarta.validation.Valid;

@Validated

@RestController
@RequestMapping("/buyer")
public class BuyerController {

	private final BuyerService buyerService;

	@Autowired
	public BuyerController(BuyerService buyerService) {
		this.buyerService = buyerService;
	}

	@PostMapping("/register")
	public ResponseEntity<String> buyerRegistration(@Valid @RequestBody BuyerDto buyerDto) {
		return buyerService.buyerRegistration(buyerDto);
	}

	@PostMapping("/login")
	public ResponseEntity<?> buyerLogin(@RequestBody LoginDto login) {
		return buyerService.buyerLogin(login);

	}

	@PutMapping("/updateprofile")
	public ResponseEntity<String> update(@Valid @RequestBody BuyerDto buyerDto) {
		return buyerService.update(buyerDto);
	}

	@GetMapping("/forgotpassword/{email}")
	public ResponseEntity<String> getPasswordtoemail(@PathVariable String email) {
		return buyerService.getPasswordtoemail(email);
	}

	@GetMapping("/registereddetails")
	public List<BuyerDto> getAllBuyerDetails() {
		return buyerService.getAllBuyerDetails();
	}

	@GetMapping("/buyerdetails/{email}")
	public List<BuyerDto> getBuyerdetailsByEmail(@PathVariable String email) {
		return buyerService.getBuyerdetailsByEmail(email);
	}

	@GetMapping("/getcount")
	public int getBuyerCount() {
		return buyerService.getBuyerCount();
	}

	@PostMapping("/payment")
	@CircuitBreaker(name = "buyerregistration-service", fallbackMethod = "fallbackMethod")
	public ResponseEntity<String> addPayment(@RequestBody PaymentDto paymentDto) {
		return buyerService.addtoPayment(paymentDto);
	}

	public ResponseEntity<String> fallbackMethod(@RequestBody PaymentDto paymentDto, RuntimeException ex) {
		//return new ResponseEntity<>("Service is down", HttpStatus.BAD_REQUEST);
		return new ResponseEntity<>("{\"message\": \"server id down try after some time\"}" ,HttpStatus.BAD_REQUEST
				);
	}
}
