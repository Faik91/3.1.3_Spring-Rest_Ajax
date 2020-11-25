package net.crudapp.controller;

import net.crudapp.model.User;
import net.crudapp.service.RoleService;
import net.crudapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AjaxController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public AjaxController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/all-users1")
    public String allUsers(@AuthenticationPrincipal User authUser,  ModelMap modelMap){
//        modelMap.addAttribute("user", new User());
//        modelMap.addAttribute("authUser", authUser);
//        modelMap.addAttribute("usersList", userService.allUsers());
//        modelMap.addAttribute("roles", roleService.allRoles());
        return "test/allUsers";
    }
}
