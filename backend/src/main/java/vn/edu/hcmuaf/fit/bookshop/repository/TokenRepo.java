package vn.edu.hcmuaf.fit.bookshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import vn.edu.hcmuaf.fit.bookshop.entity.Token;

import java.util.List;
import java.util.Optional;

public interface TokenRepo extends JpaRepository<Token, Integer> {

    Optional<Token> findByToken(String token);

    @Query("""
            select t from Token t
            where t.user.id = :userId
            and (t.expired = false or t.revoked = false)
            """)
    List<Token> findAllValidTokenByUser(Integer userId);
}