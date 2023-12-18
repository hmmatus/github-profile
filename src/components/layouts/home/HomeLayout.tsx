"use client";
import { use, useEffect, useRef, useState } from "react";
import CustomInput from "@/components/elements/inputs/CustomInput/CustomInput";
import styles from "./HomeLayout.module.scss";
import InformationTag from "@/components/elements/tags/InformationTag/InformationTag";
import { getProfile, getRepos } from "@/api/profile";
import RepoCard from "@/components/elements/cards/RepoCard/RepoCard";
import { UserI } from "@/models/user.model";
import { RepoI } from "@/models/repo.model";
import HomeSkeleton from "./HomeSkeleton";
import Image from "next/image";
import { useUserContext } from "@/context/Context";

const HomeLayout = () => {
  const [repos, setRepos] = useState<RepoI[] | []>([]);
  const [selectedRepos, setSelectedRepos] = useState<RepoI[] | []>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, updateUser } = useUserContext();
  const prevUserRef = useRef<UserI | null>(null);

  async function fetchProfile(name: string) {
    try {
      const data = await getProfile(name);
      updateUser(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: HomeLayout.tsx:21 ~ fetchProfile ~ error:",
        error
      );
    }
  }
  async function fetchRepos(name: string) {
    try {
      const data = await getRepos(name);
      setRepos(data);
      setSelectedRepos(data.slice(0, 4));
    } catch (error) {
      console.log("🚀 ~ file: HomeLayout.tsx:30 ~ fetchRepos ~ error:", error);
    }
  }

  async function handleFetch(name: string) {
    setLoading(true);
    await Promise.all([fetchProfile(name), fetchRepos(name)]);
    setLoading(false);
  }

  function handleSeeAll() {
    if (!showAll) {
      setSelectedRepos([...repos]);
    } else {
      setSelectedRepos([...repos.slice(0, 4)]);
    }
    setShowAll(!showAll);
  }

  function handleOpenNav(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  useEffect(() => {
    handleFetch("github");
  }, []);

  useEffect(() => {
    const currentUser = user;
    const prevUser = prevUserRef.current;
    if (prevUser !== currentUser) {
      fetchRepos(user?.login || '');
    }
    prevUserRef.current = currentUser;
  }, [user]);

  if (loading) {
    return <HomeSkeleton />;
  }

  const {
    avatar_url = "",
    followers = 0,
    following = 0,
    location = "",
    name = "",
    bio = "",
  } = user as UserI;

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <div className={styles.container}>
      <div className={styles["body"]}>
        <section className={styles["profile-container"]}>
          <div className={styles["image-header"]}>
            <Image
              className={styles["profile-img"]}
              alt="Image logo"
              src={avatar_url}
              width={150}
              height={150}
            />
          </div>
          <div className={styles["tags-container"]}>
            <InformationTag label="Followers" value={followers} />
            <InformationTag label="Following" value={following} />
            <InformationTag label="Location" value={location} />
          </div>
        </section>
        <section className={styles["bio-container"]}>
          <h1>{name}</h1>
          <p>{bio}</p>
        </section>

        <section className={styles["repo-container"]}>
          {selectedRepos.map((elto, index) => (
            <RepoCard
              repo={elto}
              key={index}
              onClick={() => handleOpenNav(elto.html_url)}
            />
          ))}
        </section>
        <section>
          <p onClick={handleSeeAll} className={styles["footer-text"]}>{`${
            showAll ? "View less Repositories" : "View all repositories"
          }`}</p>
        </section>
      </div>
    </div>
  );
};

export default HomeLayout;
