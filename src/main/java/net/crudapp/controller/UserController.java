package net.crudapp.controller;

import net.crudapp.model.User;
import net.crudapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@Controller
@RequestMapping("/")
public class UserController {
    
    @GetMapping(value = "login")
    public String loginPage() {
        return "login";
    }

    @GetMapping("/user")
    public String userPage(@AuthenticationPrincipal User user, Model model) {
        model.addAttribute("user", user);
        return "/userData";
    }
}
