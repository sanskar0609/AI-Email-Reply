package com.email.Ai_email_reply.app;
//
//import lombok.AllArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/email")
//@AllArgsConstructor
//@CrossOrigin(origins = "*")
//public class EmailGeneratorController {
//
//
//    private final EmailGeneratorService emailGeneratorService;
//
//
//    @PostMapping("generate")
//    public ResponseEntity<String>generatedEmail(@RequestBody EmailRequest emailRequest){
//        String response=emailGeneratorService.generateEmailReply((emailRequest));
//        return ResponseEntity.ok(response);
//    }
//}


import com.email.Ai_email_reply.summerization.EmailSummarizerService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;
    private final EmailSummarizerService emailSummarizerService;

    // Generate email reply
    @PostMapping("generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }


    @PostMapping("summer/summarize")
    public ResponseEntity<String> summarizeEmail(@RequestBody com.email.Ai_email_reply.summerization.EmailRequest emailRequest) {
        String response = emailSummarizerService.summarizeEmail(emailRequest);
        return ResponseEntity.ok(response);
    }
}
