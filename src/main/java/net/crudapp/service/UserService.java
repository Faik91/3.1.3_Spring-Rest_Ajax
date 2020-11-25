package net.crudapp.service;

import net.crudapp.model.User;
import net.crudapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByName(String username) {
        return userRepository.getUserByEmail(username);
    }

    public List<User> allUsers() {
        return this.userRepository.findAll();
    }

    public void saveUser(User user) {
        this.userRepository.save(user);
    }

    public void updateUser(User user) {
        this.userRepository.save(user);
    }

    public void deleteUser(long id) {
       this.userRepository.deleteById(id);
    }

    public User getUserById(long id) {
        return this.userRepository.findById(id).get();
    }


}
