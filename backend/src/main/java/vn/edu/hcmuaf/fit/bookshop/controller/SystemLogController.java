package vn.edu.hcmuaf.fit.bookshop.controller;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import vn.edu.hcmuaf.fit.bookshop.entity.SystemLog;
import vn.edu.hcmuaf.fit.bookshop.repository.SystemLogRepo;

@RestController
@RequestMapping("/api/logs")
@RequiredArgsConstructor
public class SystemLogController {

    private final SystemLogRepo systemLogRepo;

    @GetMapping
    public List<SystemLog> getAllLogs() {
        return systemLogRepo.findAll();
    }
}