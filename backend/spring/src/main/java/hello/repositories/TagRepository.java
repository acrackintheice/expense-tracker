package hello.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import hello.entities.Tag;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface TagRepository extends MongoRepository<Tag, String> {

}