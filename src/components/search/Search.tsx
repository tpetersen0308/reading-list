import React from "react";
import { Form, Button } from "react-bootstrap";
import { SearchProps } from "./SearchProps";

const Search: React.SFC<SearchProps> = (props: SearchProps) => {
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="title-search-field">Search by Title:</Form.Label>
          <Form.Control id="title-search-field" type="text" placeholder="Search by Title" onChange={props.handleTitleChange} />
        </Form.Group>
        <Button type="submit" onClick={props.submit} >Search</Button>
      </Form>
    </div>
  )
}

export default Search;