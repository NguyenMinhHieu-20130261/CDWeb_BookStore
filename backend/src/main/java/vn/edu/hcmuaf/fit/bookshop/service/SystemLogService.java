package vn.edu.hcmuaf.fit.bookshop.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vn.edu.hcmuaf.fit.bookshop.entity.SystemLog;
import vn.edu.hcmuaf.fit.bookshop.repository.SystemLogRepo;

@Service
@RequiredArgsConstructor
public class SystemLogService {

    private final SystemLogRepo systemLogRepo;

    public void saveLog(String action, String level, String description, Long userId, String username) {
        SystemLog log = SystemLog.builder()
                .action(action)
                .level(level)
                .description(description)
                .userId(userId)
                .username(username)
                .build();
        systemLogRepo.save(log);
    }
}