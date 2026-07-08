package vn.edu.hcmuaf.fit.bookshop.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import vn.edu.hcmuaf.fit.bookshop.repository.RoleRepo;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private RoleRepo roleRepo;

    @Test
    void contextLoads() {
        System.out.println("================================== ROLES IN DB ==================================");
        roleRepo.findAll().forEach(role -> {
            System.out.println("ROLE ID: " + role.getId() + " - DESC: " + role.getDescription());
        });
        System.out.println("=================================================================================");
    }

}
