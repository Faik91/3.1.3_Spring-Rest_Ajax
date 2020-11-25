package net.crudapp.controller;

import net.crudapp.model.Role;
import net.crudapp.model.User;
import net.crudapp.service.RoleService;
import net.crudapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public String allUsers(@AuthenticationPrincipal User authUser, Model model){
        model.addAttribute("authUser", authUser);
        model.addAttribute("user", new User());
        List<User> usersList = this.userService.allUsers();
        model.addAttribute("usersList", usersList);
        List<Role> roles = this.roleService.allRoles();
        model.addAttribute("roles", roles);

        return "user-list";
    }

//    @GetMapping("/user-create")
//    public String createUserForm(User user, Model model){
//
//        model.addAttribute("user", user);
//
//        return "user-create";
//    }

    @PostMapping("/user-create")
    public String createUser(User user){ ;
        this.userService.saveUser(user);
        return "redirect:/admin/users";
    }

    @GetMapping("/user-delete/{id}")
    public String deleteUser(@PathVariable("id") long id ){
        this.userService.deleteUser(id);
        return "redirect:/admin/users";
    }

//    @GetMapping("/getOne")
//    public User getOne(Model model,  long id){
//        User userToUpdate = this.userService.getUserById(id);
//        model.addAttribute("userToUpdate", userToUpdate);
//        return userToUpdate;
//    }

    @PostMapping("/user-update")
    public String userUpdate(@ModelAttribute User user){
        this.userService.updateUser(user);
        return "redirect:/admin/users";
    }

    @GetMapping("/userData/{id}")
    public String userData(@PathVariable("id") long id, Model model){
        User user = this.userService.getUserById(id);
        model.addAttribute("user", user);
        return "userData";
    }

}
