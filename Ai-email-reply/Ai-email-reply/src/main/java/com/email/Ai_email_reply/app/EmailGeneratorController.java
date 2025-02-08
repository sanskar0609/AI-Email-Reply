package com.email.Ai_email_reply.app;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {


    private final EmailGeneratorService emailGeneratorService;


    @PostMapping("generate")
    public ResponseEntity<String>generatedEmail(@RequestBody EmailRequest emailRequest){
        String response=emailGeneratorService.generateEmailReply((emailRequest));
        return ResponseEntity.ok(response);
    }
}
