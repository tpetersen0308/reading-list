import React from "react";
import { Form, Button } from "react-bootstrap";
import { SearchProps } from "./SearchProps";

const Search: React.SFC<SearchProps> = (props: SearchProps) => {
  return (
    <div id="search-form">
      <strong>Use the search below to browse Google Books</strong>
      <br />
      <br />
      <Form>
        <Form.Group>
          <Form.Label htmlFor="title-search-field">Search by Title:</Form.Label>
          <Form.Control id="title-search-field" type="text" placeholder="Search by Title" onChange={props.handleTitleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="author-search-field">Search by Author:</Form.Label>
          <Form.Control id="author-search-field" type="text" placeholder="Search by Author" onChange={props.handleAuthorChange} />
        </Form.Group>
        <Button type="submit" onClick={props.submit} >Search</Button>
      </Form>
    </div>
  )
}

export default Search;