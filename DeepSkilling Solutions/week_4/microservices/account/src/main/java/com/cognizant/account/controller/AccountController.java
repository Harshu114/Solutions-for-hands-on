package com.cognizant.account.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    /**
     * GET /accounts/{number} - returns a dummy account record (no backend).
     */
    @GetMapping("/accounts/{number}")
    public Map<String, Object> getAccount(@PathVariable String number) {
        Map<String, Object> account = new LinkedHashMap<>();
        account.put("number", "00987987973432");
        account.put("type", "savings");
        account.put("balance", 234343);
        return account;
    }
}
