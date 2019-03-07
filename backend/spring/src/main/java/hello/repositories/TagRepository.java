package hello.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import hello.entities.Tag;

public interface TagRepository extends MongoRepository<Tag, String> {

}